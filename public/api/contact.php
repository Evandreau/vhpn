<?php
/**
 * Verstuurt formulierinzendingen per e-mail naar info@vhpn.nl.
 *
 * Verzending kan via twee transports (zie config.php):
 *   - mail_transport = 'mail' (default) → standaard PHP mail() van Hostnet
 *   - mail_transport = 'smtp'           → SMTP via Hostnet mailbox
 *
 * Captcha wordt server-side geverifieerd voordat er gemaild wordt.
 */
require __DIR__ . '/_bootstrap.php';

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    json_response(['success' => false, 'error' => 'Method not allowed'], 405);
}

if (!rate_limit('contact', 10, 600)) {
    json_response(['success' => false, 'error' => 'Too many submissions, try again later'], 429);
}

$body = read_json_body();

// ---- Honeypot --------------------------------------------------------------
if (!empty($body['company_website'])) {
    json_response(['success' => true]);
}

// ---- Captcha (verplicht zodra recaptcha_secret_key is geconfigureerd) ------
$captchaToken  = clean_str($body['captcha_token'] ?? '', 4000);
$captchaAction = clean_str($body['captcha_action'] ?? '', 64);
$secret = (string) ($CONFIG['recaptcha_secret_key'] ?? '');
$captchaConfigured = ($secret !== '' && $secret !== 'VUL_HIER_DE_RECAPTCHA_SECRET_IN');

if ($captchaConfigured) {
    if ($captchaToken === '') {
        json_response(['success' => false, 'error' => 'Captcha token missing'], 400);
    }
    $ch = curl_init('https://www.google.com/recaptcha/api/siteverify');
    curl_setopt_array($ch, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_POST           => true,
        CURLOPT_POSTFIELDS     => http_build_query([
            'secret'   => $secret,
            'response' => $captchaToken,
            'remoteip' => $_SERVER['REMOTE_ADDR'] ?? '',
        ]),
        CURLOPT_TIMEOUT        => 10,
    ]);
    $cResp = curl_exec($ch);
    curl_close($ch);
    $cData = is_string($cResp) ? json_decode($cResp, true) : null;
    $cScore = is_array($cData) && isset($cData['score']) ? (float) $cData['score'] : 0.0;
    $cAct   = is_array($cData) && isset($cData['action']) ? (string) $cData['action'] : '';
    $minScore = (float) ($CONFIG['recaptcha_min_score'] ?? 0.5);
    $ok = is_array($cData) && !empty($cData['success']) && $cScore >= $minScore
          && ($captchaAction === '' || $cAct === '' || $cAct === $captchaAction);
    if (!$ok) {
        json_response(['success' => false, 'error' => 'Captcha verification failed'], 400);
    }
}

// ---- Velden valideren ------------------------------------------------------
$formType = clean_str($body['form_type'] ?? 'contact', 32);
$name     = clean_str($body['name'] ?? '', 200);
$email    = clean_email($body['email'] ?? '');
$phone    = clean_str($body['phone'] ?? '', 50);
$message  = clean_multiline($body['message'] ?? '', 5000);

if ($name === '' || $email === '') {
    json_response(['success' => false, 'error' => 'Name and email are required'], 400);
}

$listingId       = clean_str($body['listing_id'] ?? '', 64);
$listingUrl      = clean_str($body['listing_url'] ?? '', 500);
$preferredDays   = clean_str($body['preferred_days'] ?? '', 200);
$preferredSlot   = clean_str($body['preferred_timeslot'] ?? '', 64);
$rentalStartDate = clean_str($body['rental_start_date'] ?? '', 32);
$rentalPeriod    = clean_str($body['rental_period'] ?? '', 32);
$preferredArea   = clean_str($body['preferred_area'] ?? '', 100);
$budget          = clean_str($body['budget'] ?? '', 100);
$moveInDate      = clean_str($body['move_in_date'] ?? '', 32);
$grossIncome     = isset($body['gross_income']) && is_numeric($body['gross_income'])
                    ? (float) $body['gross_income'] : null;
$partnerIncome   = isset($body['partner_income']) && is_numeric($body['partner_income'])
                    ? (float) $body['partner_income'] : null;

// ---- E-mail samenstellen ---------------------------------------------------
$subjectMap = [
    'contact'           => 'Contactformulier',
    'viewing'           => 'Bezichtigingsverzoek',
    'landlord_contact'  => 'Verhuurder — contact',
    'landlord_property' => 'Verhuurder — woning aanmelden',
    'search_help'       => 'Lead — zoekhulp',
];
$subjectLabel = $subjectMap[$formType] ?? 'Formulierinzending';
$subject = "[VHPN] $subjectLabel — $name";

$lines = [];
$lines[] = "Type: $subjectLabel ($formType)";
$lines[] = "Naam: $name";
$lines[] = "E-mail: $email";
if ($phone !== '')           $lines[] = "Telefoon: $phone";
if ($preferredArea !== '')   $lines[] = "Voorkeursgebied: $preferredArea";
if ($budget !== '')          $lines[] = "Budget: $budget";
if ($moveInDate !== '')      $lines[] = "Gewenste startdatum: " . format_date_eu($moveInDate);
if ($rentalStartDate !== '') $lines[] = "Huuringangsdatum: " . format_date_eu($rentalStartDate);
if ($rentalPeriod !== '')    $lines[] = "Huurperiode: " . format_rental_period($rentalPeriod);
if ($preferredDays !== '')   $lines[] = "Beschikbare dagen: " . format_days_nl($preferredDays);
if ($preferredSlot !== '')   $lines[] = "Dagdeel: " . format_timeslot_nl($preferredSlot);
if ($grossIncome !== null)   $lines[] = "Bruto inkomen p/m: € " . number_format($grossIncome, 0, ',', '.');
if ($partnerIncome !== null) $lines[] = "Partner inkomen p/m: € " . number_format($partnerIncome, 0, ',', '.');
if ($listingId !== '')       $lines[] = "Listing ID: $listingId";
if ($listingUrl !== '')      $lines[] = "Listing URL: $listingUrl";
if ($message !== '')         $lines[] = "\nBericht:\n$message";
$lines[] = "\n---";
$lines[] = "IP: " . ($_SERVER['REMOTE_ADDR'] ?? '');
$lines[] = "User agent: " . substr($_SERVER['HTTP_USER_AGENT'] ?? '', 0, 200);
$lines[] = "Tijd: " . date('Y-m-d H:i:s');

$bodyText = implode("\n", $lines);

$to        = (string) ($CONFIG['mail_to'] ?? 'info@vhpn.nl');
$fromMail  = (string) ($CONFIG['mail_from'] ?? 'noreply@vhpn.nl');
$fromName  = (string) ($CONFIG['mail_from_name'] ?? 'VHPN Website');
$transport = strtolower((string) ($CONFIG['mail_transport'] ?? 'mail'));

$ok = false;
$errMsg = '';

if ($transport === 'smtp') {
    $ok = send_via_smtp($CONFIG, $to, $subject, $bodyText, $fromMail, $fromName, $email, $errMsg);
    if (!$ok) {
        // Praktische fallback: SMTP faalt (vaak TLS handshake) -> probeer mail()
        error_log("VHPN SMTP failed, falling back to mail(): $errMsg");
        $smtpErr = $errMsg;
        $errMsg = '';
        $ok = send_via_mail($to, $subject, $bodyText, $fromMail, $fromName, $email, $errMsg);
        if (!$ok) $errMsg = "SMTP: $smtpErr | mail(): $errMsg";
    }
} else {
    $ok = send_via_mail($to, $subject, $bodyText, $fromMail, $fromName, $email, $errMsg);
}

if (!$ok) {
    error_log("VHPN mail ($transport) failed for $email -> $to: $errMsg");
    json_response(['success' => false, 'error' => 'Mail delivery failed'], 500);
}

json_response(['success' => true]);

// ---------------------------------------------------------------------------
// Formatters (NL)
// ---------------------------------------------------------------------------

function format_date_eu(string $value): string {
    $ts = strtotime($value);
    if ($ts === false) return $value;
    return date('d-m-Y', $ts);
}

function format_rental_period(string $value): string {
    $v = trim($value);
    if ($v === '') return $v;
    if (is_numeric($v)) {
        $n = (int) $v;
        return $n === 1 ? '1 maand' : "$n maanden";
    }
    return $v;
}

function format_days_nl(string $value): string {
    $map = [
        'mon' => 'maandag', 'ma' => 'maandag', 'monday' => 'maandag',
        'tue' => 'dinsdag', 'di' => 'dinsdag', 'tuesday' => 'dinsdag',
        'wed' => 'woensdag', 'wo' => 'woensdag', 'wednesday' => 'woensdag',
        'thu' => 'donderdag', 'do' => 'donderdag', 'thursday' => 'donderdag',
        'fri' => 'vrijdag', 'vr' => 'vrijdag', 'friday' => 'vrijdag',
        'sat' => 'zaterdag', 'za' => 'zaterdag', 'saturday' => 'zaterdag',
        'sun' => 'zondag', 'zo' => 'zondag', 'sunday' => 'zondag',
    ];
    $parts = preg_split('/\s*,\s*/', $value);
    $out = [];
    foreach ($parts as $p) {
        $key = strtolower(trim($p));
        $out[] = $map[$key] ?? $p;
    }
    return implode(', ', $out);
}

function format_timeslot_nl(string $value): string {
    $map = [
        'morning'   => 'Ochtend',
        'afternoon' => 'Middag',
        'evening'   => 'Avond',
        'any'       => 'Geen voorkeur',
    ];
    $key = strtolower(trim($value));
    return $map[$key] ?? $value;
}

// ---------------------------------------------------------------------------
// Transports
// ---------------------------------------------------------------------------

function send_via_mail(string $to, string $subject, string $bodyText, string $fromMail, string $fromName, string $replyTo, string &$errMsg): bool {
    $encSubject = '=?UTF-8?B?' . base64_encode($subject) . '?=';
    $encFrom    = '=?UTF-8?B?' . base64_encode($fromName) . '?= <' . $fromMail . '>';

    $headers   = [];
    $headers[] = 'From: ' . $encFrom;
    $headers[] = 'Reply-To: ' . $replyTo;
    $headers[] = 'MIME-Version: 1.0';
    $headers[] = 'Content-Type: text/plain; charset=UTF-8';
    $headers[] = 'Content-Transfer-Encoding: 8bit';
    $headers[] = 'X-Mailer: VHPN/PHP';

    $ok = @mail($to, $encSubject, $bodyText, implode("\r\n", $headers), '-f' . $fromMail);
    if (!$ok) $errMsg = 'mail() returned false';
    return (bool) $ok;
}

/**
 * Eenvoudige SMTP client (geen externe afhankelijkheden).
 * Ondersteunt SSL (smtps, port 465) en STARTTLS (port 587) en LOGIN auth.
 *
 * Vereist in config.php:
 *   smtp_host, smtp_port, smtp_user, smtp_password
 *   smtp_encryption: 'ssl' | 'tls' | 'none'  (default 'ssl')
 */
function send_via_smtp(array $cfg, string $to, string $subject, string $bodyText, string $fromMail, string $fromName, string $replyTo, string &$errMsg): bool {
    $host = (string) ($cfg['smtp_host'] ?? '');
    $port = (int)    ($cfg['smtp_port'] ?? 465);
    $user = (string) ($cfg['smtp_user'] ?? $fromMail);
    $pass = (string) ($cfg['smtp_password'] ?? '');
    $enc  = strtolower((string) ($cfg['smtp_encryption'] ?? 'ssl'));

    if ($host === '' || $pass === '') {
        $errMsg = 'SMTP not configured';
        return false;
    }

    $remote = ($enc === 'ssl' ? 'ssl://' : 'tcp://') . $host . ':' . $port;
    $errno = 0; $errstr = '';
    $sock = @stream_socket_client($remote, $errno, $errstr, 15);
    if (!$sock) {
        $errMsg = "SMTP connect: $errstr ($errno)";
        return false;
    }
    stream_set_timeout($sock, 15);

    $expect = function (string $code) use ($sock, &$errMsg): bool {
        $resp = '';
        while (($line = fgets($sock, 515)) !== false) {
            $resp .= $line;
            if (isset($line[3]) && $line[3] === ' ') break;
        }
        if (strpos($resp, $code) !== 0) {
            $errMsg = 'SMTP unexpected: ' . trim($resp);
            return false;
        }
        return true;
    };
    $send = function (string $cmd) use ($sock) {
        fwrite($sock, $cmd . "\r\n");
    };

    if (!$expect('220')) { fclose($sock); return false; }
    $send('EHLO vhpn.nl');
    if (!$expect('250')) { fclose($sock); return false; }

    if ($enc === 'tls') {
        $send('STARTTLS');
        if (!$expect('220')) { fclose($sock); return false; }
        // Best-available TLS: TLS 1.3 + 1.2 + 1.1 (op oudere PHP builds vallen
        // onbekende constants gewoon weg via defined()-check).
        $cryptoMethod = 0;
        foreach ([
            'STREAM_CRYPTO_METHOD_TLSv1_3_CLIENT',
            'STREAM_CRYPTO_METHOD_TLSv1_2_CLIENT',
            'STREAM_CRYPTO_METHOD_TLSv1_1_CLIENT',
        ] as $c) {
            if (defined($c)) $cryptoMethod |= constant($c);
        }
        if ($cryptoMethod === 0) {
            $cryptoMethod = STREAM_CRYPTO_METHOD_TLS_CLIENT;
        }
        if (!@stream_socket_enable_crypto($sock, true, $cryptoMethod)) {
            $errMsg = 'STARTTLS crypto handshake failed (host=' . $host . ':' . $port . ')';
            error_log('VHPN SMTP ' . $errMsg);
            fclose($sock); return false;
        }
        $send('EHLO vhpn.nl');
        if (!$expect('250')) { fclose($sock); return false; }
    }

    $send('AUTH LOGIN');
    if (!$expect('334')) { fclose($sock); return false; }
    $send(base64_encode($user));
    if (!$expect('334')) { fclose($sock); return false; }
    $send(base64_encode($pass));
    if (!$expect('235')) { fclose($sock); return false; }

    $send('MAIL FROM:<' . $fromMail . '>');
    if (!$expect('250')) { fclose($sock); return false; }
    $send('RCPT TO:<' . $to . '>');
    if (!$expect('250')) { fclose($sock); return false; }
    $send('DATA');
    if (!$expect('354')) { fclose($sock); return false; }

    $encSubject = '=?UTF-8?B?' . base64_encode($subject) . '?=';
    $encFrom    = '=?UTF-8?B?' . base64_encode($fromName) . '?= <' . $fromMail . '>';
    $headers = [
        'Date: ' . date('r'),
        'From: ' . $encFrom,
        'To: ' . $to,
        'Reply-To: ' . $replyTo,
        'Subject: ' . $encSubject,
        'MIME-Version: 1.0',
        'Content-Type: text/plain; charset=UTF-8',
        'Content-Transfer-Encoding: 8bit',
        'X-Mailer: VHPN/PHP-SMTP',
    ];
    // Dot-stuffing: regels die met '.' beginnen krijgen extra '.'
    $safeBody = preg_replace('/^\./m', '..', $bodyText);
    $payload  = implode("\r\n", $headers) . "\r\n\r\n" . $safeBody . "\r\n.";
    $send($payload);
    if (!$expect('250')) { fclose($sock); return false; }

    $send('QUIT');
    fclose($sock);
    return true;
}
