<?php
/**
 * VHPN backend configuratie — Hostnet shared hosting.
 *
 * KOPIEER dit bestand naar `config.php` op de server (NIET in git checken!)
 * en vul de waarden hieronder in.
 *
 * config.php wordt door .htaccess geblokkeerd voor publieke toegang.
 */

return [
    // ---- Pararius Office API ----
    // Dezelfde key die voorheen in Lovable Cloud (PARARIUS_API_KEY) stond.
    'pararius_api_key' => 'VUL_HIER_DE_PARARIUS_API_KEY_IN',
    // Server-side cache TTL in seconden voor de Pararius response.
    // 600 = 10 minuten. Bij Pararius timeout valt de proxy automatisch
    // terug op de laatst opgeslagen cache (stale-while-error).
    'pararius_cache_ttl' => 600,

    // ---- Google reCAPTCHA v3 ----
    'recaptcha_secret_key' => 'VUL_HIER_DE_RECAPTCHA_SECRET_IN',
    'recaptcha_site_key'   => 'VUL_HIER_DE_RECAPTCHA_SITE_KEY_IN',
    'recaptcha_min_score'  => 0.5,

    // ---- E-mail ----
    // Naar wie de formulierinzendingen gestuurd worden.
    'mail_to'        => 'info@vhpn.nl',
    // BELANGRIJK: 'mail_from' MOET een bestaande mailbox op vhpn.nl zijn
    // (bijvoorbeeld info@vhpn.nl of noreply@vhpn.nl). Anders wordt de
    // mail door SPF/DMARC van ontvangers (Gmail, Outlook, ...) afgekeurd.
    // De envelope-from (-f) wordt door contact.php automatisch op deze
    // waarde gezet zodat SPF aligned is.
    'mail_from'      => 'noreply@vhpn.nl',
    'mail_from_name' => 'VHPN Website',

    // ---- Mail transport ----
    // 'mail' = standaard PHP mail() via Hostnet (eenvoudigst, default).
    // 'smtp' = SMTP via een Hostnet mailbox (betrouwbaarder, aanbevolen
    //          zodra DMARC strikt staat). Vul dan onderstaande in:
    'mail_transport' => 'mail',

    // SMTP instellingen — alleen nodig wanneer mail_transport = 'smtp'.
    // Hostnet standaard: smtp.hostnet.nl, poort 465 (SSL).
    'smtp_host'       => 'smtp.hostnet.nl',
    'smtp_port'       => 465,
    'smtp_encryption' => 'ssl',          // 'ssl' (465) | 'tls' (587) | 'none'
    'smtp_user'       => 'noreply@vhpn.nl', // volledige mailbox-naam
    'smtp_password'   => '',                // mailbox wachtwoord

    // ---- CORS ----
    // Alleen relevant wanneer een ANDER domein /api/* aanroept. De
    // productiesite (vhpn.nl) draait same-origin en stuurt geen Origin
    // header — die requests werken altijd, ongeacht deze lijst.
    'allowed_origins' => [
        'https://vhpn.nl',
        'https://www.vhpn.nl',
    ],
];
