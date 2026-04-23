<?php
/**
 * Server-side verificatie van een reCAPTCHA v3 token.
 * Body: { token: string, action: string }
 * Geeft { success: bool, score?: number, action?: string }
 */
require __DIR__ . '/_bootstrap.php';

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    json_response(['success' => false, 'error' => 'Method not allowed'], 405);
}

if (!rate_limit('recaptcha', 30, 60)) {
    json_response(['success' => false, 'error' => 'Too many requests'], 429);
}

$body = read_json_body();
$token = clean_str($body['token'] ?? '', 4000);
$expectedAction = clean_str($body['action'] ?? '', 64);

if ($token === '') {
    json_response(['success' => false, 'error' => 'Missing captcha token'], 400);
}

$secret = (string) ($CONFIG['recaptcha_secret_key'] ?? '');
if ($secret === '' || $secret === 'VUL_HIER_DE_RECAPTCHA_SECRET_IN') {
    json_response(['success' => false, 'error' => 'Captcha not configured'], 500);
}

$ch = curl_init('https://www.google.com/recaptcha/api/siteverify');
curl_setopt_array($ch, [
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_POST           => true,
    CURLOPT_POSTFIELDS     => http_build_query([
        'secret'   => $secret,
        'response' => $token,
        'remoteip' => $_SERVER['REMOTE_ADDR'] ?? '',
    ]),
    CURLOPT_TIMEOUT        => 10,
]);
$resp = curl_exec($ch);
$err  = curl_error($ch);
curl_close($ch);

if ($resp === false) {
    error_log('reCAPTCHA cURL error: ' . $err);
    json_response(['success' => false, 'error' => 'Verification error'], 500);
}

$data = json_decode($resp, true);
if (!is_array($data) || empty($data['success'])) {
    json_response(['success' => false, 'error' => 'Captcha verification failed']);
}

$action = isset($data['action']) ? (string) $data['action'] : '';
if ($expectedAction !== '' && $action !== '' && $action !== $expectedAction) {
    json_response(['success' => false, 'error' => 'Captcha action mismatch']);
}

$score = isset($data['score']) ? (float) $data['score'] : 0.0;
$min   = (float) ($CONFIG['recaptcha_min_score'] ?? 0.5);
if ($score < $min) {
    json_response(['success' => false, 'error' => 'Captcha score too low', 'score' => $score]);
}

json_response(['success' => true, 'score' => $score, 'action' => $action]);
