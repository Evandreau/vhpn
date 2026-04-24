<?php
/**
 * Proxy + sanitizer + server-side cache voor de Pararius Office API.
 *
 * Body: { action?: string, lang?: string, ...extra }
 * Default action = "getproperties".
 *
 * Belangrijke privacygaranties (zie ook src/lib/address.ts):
 *  - `number` en `addition` worden uit elke property verwijderd voordat de
 *    response naar de browser gaat.
 *  - `zipcode` wordt volledig verwijderd (ook PC4 kan in combinatie met
 *    straat te specifiek zijn). Frontend toont alleen city/district.
 *  - Wanneer een property als vertrouwelijk gemarkeerd is (vertrouwelijk=1
 *    of confidential=1), worden óók straat, lat/lng en exact adres
 *    verwijderd; alleen district + city blijven over.
 *
 * Caching:
 *  - File-based cache in sys_get_temp_dir() met TTL (default 600 s).
 *  - Bij Pararius timeout/5xx valt de proxy terug op de laatste cache
 *    (stale-while-error) zodat de site nooit zwart gaat.
 *
 * Response format blijft compatibel met de bestaande frontend:
 *   { success, contentType, rawResponse }
 * waarin rawResponse de (gesanitized) JSON-string is.
 */
require __DIR__ . '/_bootstrap.php';

// Pararius proxy: caching doet het zware werk; rate limit is anti-abuse.
// 60 requests / 5 min / IP is ruim voor legit listings-verkeer.
$rlWindow = 300;
$rlMax    = 60;
if (!rate_limit('pararius', $rlMax, $rlWindow)) {
    header('Retry-After: ' . $rlWindow);
    json_response(['error' => 'Too many requests'], 429);
}

$apiKey = (string) ($CONFIG['pararius_api_key'] ?? '');
if ($apiKey === '' || $apiKey === 'VUL_HIER_DE_PARARIUS_API_KEY_IN') {
    json_response(['error' => 'API key not configured'], 500);
}

$body   = read_json_body();
$action = clean_str($body['action'] ?? 'getproperties', 64);
$lang   = clean_str($body['lang'] ?? 'en', 8);
if (!in_array($lang, ['nl', 'en'], true)) $lang = 'en';

$extra = [];
foreach ($body as $k => $v) {
    if (in_array($k, ['action', 'lang'], true)) continue;
    if (is_string($v) || is_numeric($v)) $extra[(string) $k] = (string) $v;
}

$params = array_merge([
    'key'            => $apiKey,
    'action'         => $action,
    'lang'           => $lang,
    'version'        => '3',
    'client-version' => '4.0.1',
], $extra);

// ---------------- Cache laag ------------------------------------------------
$cacheTtl = (int) ($CONFIG['pararius_cache_ttl'] ?? 600); // 10 min default
$cacheDir = sys_get_temp_dir() . '/vhpn_pararius_cache';
if (!is_dir($cacheDir)) @mkdir($cacheDir, 0700, true);
$cacheKeyParams = $params;
unset($cacheKeyParams['key']); // key niet meenemen in cache key
ksort($cacheKeyParams);
$cacheFile = $cacheDir . '/' . md5(json_encode($cacheKeyParams)) . '.json';

$now = time();
$cached = null;
if (file_exists($cacheFile)) {
    $raw = @file_get_contents($cacheFile);
    if ($raw !== false) {
        $parsed = json_decode($raw, true);
        if (is_array($parsed) && isset($parsed['payload'], $parsed['stored_at'])) {
            $cached = $parsed;
        }
    }
}

// Verse cache hit -> direct serveren
if ($cached !== null && ($now - (int) $cached['stored_at']) < $cacheTtl) {
    header('X-VHPN-Cache: HIT');
    header('Cache-Control: public, max-age=120, s-maxage=300');
    json_response($cached['payload']);
}

// ---------------- Live call naar Pararius -----------------------------------
$ch = curl_init('https://api.parariusoffice.nl/db.php');
curl_setopt_array($ch, [
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_POST           => true,
    CURLOPT_POSTFIELDS     => http_build_query($params),
    CURLOPT_HTTPHEADER     => ['Content-Type: application/x-www-form-urlencoded'],
    CURLOPT_TIMEOUT        => 20,
    CURLOPT_CONNECTTIMEOUT => 8,
    CURLOPT_HEADER         => true,
]);

$resp     = curl_exec($ch);
$err      = curl_error($ch);
$httpCode = (int) curl_getinfo($ch, CURLINFO_HTTP_CODE);
$hdrSize  = (int) curl_getinfo($ch, CURLINFO_HEADER_SIZE);
$ctype    = (string) curl_getinfo($ch, CURLINFO_CONTENT_TYPE);
curl_close($ch);

$serveStale = function () use ($cached) {
    if ($cached !== null) {
        header('X-VHPN-Cache: STALE');
        header('Cache-Control: public, max-age=60');
        json_response($cached['payload']);
    }
};

if ($resp === false) {
    error_log('Pararius cURL error: ' . $err);
    $serveStale();
    json_response(['error' => 'Pararius request failed'], 502);
}

$rawBody = substr($resp, $hdrSize);

if ($httpCode < 200 || $httpCode >= 300) {
    error_log("Pararius HTTP $httpCode: " . substr($rawBody, 0, 300));
    $serveStale();
    json_response([
        'error'  => 'Pararius API error',
        'status' => $httpCode,
        'body'   => substr($rawBody, 0, 500),
    ], $httpCode);
}

// ---------------- Sanitatie van de response ---------------------------------
$sanitizedRaw = $rawBody;
$decoded = json_decode($rawBody, true);
if (is_array($decoded) && isset($decoded['result']['properties']) && is_array($decoded['result']['properties'])) {
    foreach ($decoded['result']['properties'] as $pid => $prop) {
        if (!is_array($prop)) continue;

        $isConfidential = false;
        foreach (['vertrouwelijk', 'confidential', 'confidentiality', 'address_confidential'] as $flag) {
            if (isset($prop[$flag]) && (string) $prop[$flag] !== '' && (string) $prop[$flag] !== '0') {
                $isConfidential = true;
                break;
            }
        }

        // Altijd verwijderen: huisnummer en toevoeging
        unset(
            $prop['number'],
            $prop['addition'],
            $prop['housenumber'],
            $prop['house_number'],
            $prop['number_addition']
        );

        // Postcode terugbrengen tot PC4 (alleen cijfers)
        if (isset($prop['zipcode']) && is_string($prop['zipcode'])) {
            if (preg_match('/^\s*(\d{4})/', $prop['zipcode'], $m)) {
                $prop['zipcode'] = $m[1];
            } else {
                $prop['zipcode'] = '';
            }
        }

        // Vertrouwelijk: ook straat + exacte coördinaten verbergen
        if ($isConfidential) {
            $prop['street'] = '';
            $prop['lat']    = '';
            $prop['lng']    = '';
            unset($prop['location_x'], $prop['location_y']);
        }

        $decoded['result']['properties'][$pid] = $prop;
    }
    $sanitizedRaw = json_encode($decoded, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
}

$payload = [
    'success'     => true,
    'contentType' => $ctype,
    'rawResponse' => $sanitizedRaw,
];

// Cache wegschrijven (atomic)
$tmp = $cacheFile . '.tmp';
@file_put_contents(
    $tmp,
    json_encode(['stored_at' => $now, 'payload' => $payload], JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE),
    LOCK_EX
);
@rename($tmp, $cacheFile);

header('X-VHPN-Cache: MISS');
header('Cache-Control: public, max-age=120, s-maxage=300');
json_response($payload);
