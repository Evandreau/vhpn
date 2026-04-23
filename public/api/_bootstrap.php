<?php
/**
 * Gemeenschappelijke bootstrap voor alle /api endpoints.
 * - Laadt config.php
 * - Stelt CORS in (alleen wanneer Origin header aanwezig is — same-origin
 *   requests vanuit vhpn.nl zelf hebben géén Origin header en mogen niet
 *   worden geblokkeerd)
 * - Biedt JSON helpers, sanitatie en een eenvoudige rate limiter
 */

declare(strict_types=1);

// ---- Config laden ----------------------------------------------------------
$configPath = __DIR__ . '/config.php';
if (!file_exists($configPath)) {
    http_response_code(500);
    header('Content-Type: application/json');
    echo json_encode([
        'error' => 'Backend not configured. Copy api/config.example.php to api/config.php and fill in the values.',
    ]);
    exit;
}
/** @var array $CONFIG */
$CONFIG = require $configPath;

// ---- CORS ------------------------------------------------------------------
// Same-origin (frontend en /api/* op hetzelfde domein) vereist GEEN CORS
// headers; browsers sturen dan geen Origin mee. We zetten headers daarom
// alléén wanneer de request een Origin heeft EN die in allowed_origins zit.
$origin  = $_SERVER['HTTP_ORIGIN'] ?? '';
$allowed = $CONFIG['allowed_origins'] ?? [];
if ($origin !== '' && in_array($origin, $allowed, true)) {
    header('Access-Control-Allow-Origin: ' . $origin);
    header('Vary: Origin');
    header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type');
    header('Access-Control-Max-Age: 600');
}

if (($_SERVER['REQUEST_METHOD'] ?? '') === 'OPTIONS') {
    http_response_code(204);
    exit;
}

// ---- JSON helpers ----------------------------------------------------------
function json_response($data, int $status = 200): void {
    http_response_code($status);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($data, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
    exit;
}

function read_json_body(): array {
    $raw = file_get_contents('php://input');
    if ($raw === false || $raw === '') return [];
    $decoded = json_decode($raw, true);
    return is_array($decoded) ? $decoded : [];
}

// ---- Rate limiter (eenvoudig, file-based) ---------------------------------
function rate_limit(string $bucket, int $maxHits = 10, int $windowSeconds = 60): bool {
    $ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
    $dir = sys_get_temp_dir() . '/vhpn_rl';
    if (!is_dir($dir)) @mkdir($dir, 0700, true);
    $file = $dir . '/' . md5($bucket . '|' . $ip) . '.json';

    $now = time();
    $data = ['hits' => [], 'first' => $now];
    if (file_exists($file)) {
        $raw = @file_get_contents($file);
        $parsed = $raw !== false ? json_decode($raw, true) : null;
        if (is_array($parsed)) $data = $parsed;
    }
    $data['hits'] = array_values(array_filter(
        $data['hits'] ?? [],
        static fn($t) => is_int($t) && ($now - $t) < $windowSeconds
    ));
    if (count($data['hits']) >= $maxHits) {
        return false;
    }
    $data['hits'][] = $now;
    @file_put_contents($file, json_encode($data), LOCK_EX);
    return true;
}

// ---- Sanitatie -------------------------------------------------------------
function clean_str($v, int $maxLen = 1000): string {
    if (!is_string($v)) return '';
    $v = trim($v);
    $v = str_replace(["\r", "\n"], ' ', $v);
    if (mb_strlen($v) > $maxLen) $v = mb_substr($v, 0, $maxLen);
    return $v;
}

function clean_email($v): string {
    if (!is_string($v)) return '';
    $v = trim($v);
    return filter_var($v, FILTER_VALIDATE_EMAIL) ? $v : '';
}

function clean_multiline($v, int $maxLen = 5000): string {
    if (!is_string($v)) return '';
    $v = trim($v);
    if (mb_strlen($v) > $maxLen) $v = mb_substr($v, 0, $maxLen);
    return $v;
}
