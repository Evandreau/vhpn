<?php
/**
 * Proxy naar de Pararius Office API.
 * Body: { action?: string, lang?: string, ...extra }
 * Default action = "getproperties".
 *
 * Geeft { success, contentType, rawResponse } — exact hetzelfde format als
 * de Supabase Edge Function gaf, zodat de frontend transformer ongewijzigd
 * blijft.
 */
require __DIR__ . '/_bootstrap.php';

if (!rate_limit('pararius', 60, 60)) {
    json_response(['error' => 'Too many requests'], 429);
}

$apiKey = (string) ($CONFIG['pararius_api_key'] ?? '');
if ($apiKey === '' || $apiKey === 'VUL_HIER_DE_PARARIUS_API_KEY_IN') {
    json_response(['error' => 'API key not configured'], 500);
}

$body = read_json_body();
$action = clean_str($body['action'] ?? 'getproperties', 64);
$lang   = clean_str($body['lang'] ?? 'en', 8);
if (!in_array($lang, ['nl', 'en'], true)) $lang = 'en';

// Extra params doorgeven, behalve gereserveerde keys
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

$ch = curl_init('https://api.parariusoffice.nl/db.php');
curl_setopt_array($ch, [
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_POST           => true,
    CURLOPT_POSTFIELDS     => http_build_query($params),
    CURLOPT_HTTPHEADER     => ['Content-Type: application/x-www-form-urlencoded'],
    CURLOPT_TIMEOUT        => 30,
    CURLOPT_HEADER         => true,
]);

$resp     = curl_exec($ch);
$err      = curl_error($ch);
$httpCode = (int) curl_getinfo($ch, CURLINFO_HTTP_CODE);
$hdrSize  = (int) curl_getinfo($ch, CURLINFO_HEADER_SIZE);
$ctype    = (string) curl_getinfo($ch, CURLINFO_CONTENT_TYPE);
curl_close($ch);

if ($resp === false) {
    error_log('Pararius cURL error: ' . $err);
    json_response(['error' => 'Pararius request failed'], 502);
}

$rawBody = substr($resp, $hdrSize);

if ($httpCode < 200 || $httpCode >= 300) {
    json_response([
        'error'      => 'Pararius API error',
        'status'     => $httpCode,
        'body'       => substr($rawBody, 0, 500),
    ], $httpCode);
}

// Korte browser/CDN cache voor live listings
header('Cache-Control: public, max-age=120, s-maxage=300');

json_response([
    'success'     => true,
    'contentType' => $ctype,
    'rawResponse' => $rawBody,
]);
