<?php
/**
 * Geeft de publieke reCAPTCHA v3 site key aan de frontend.
 * De secret key blijft uitsluitend serverside.
 */
require __DIR__ . '/_bootstrap.php';

json_response([
    'siteKey' => (string) ($CONFIG['recaptcha_site_key'] ?? ''),
]);
