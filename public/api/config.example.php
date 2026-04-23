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
    // Dezelfde key als die in Lovable Cloud stond (PARARIUS_API_KEY).
    'pararius_api_key' => 'VUL_HIER_DE_PARARIUS_API_KEY_IN',

    // ---- Google reCAPTCHA v3 ----
    // Geheime sleutel (server-side). NIET de site key.
    'recaptcha_secret_key' => 'VUL_HIER_DE_RECAPTCHA_SECRET_IN',
    // Publieke site key — wordt door /api/recaptcha-config.php aan de frontend
    // gegeven. Dezelfde waarde als RECAPTCHA_SITE_KEY in Lovable Cloud.
    'recaptcha_site_key'   => 'VUL_HIER_DE_RECAPTCHA_SITE_KEY_IN',
    // Minimum score (0.0 = bot, 1.0 = mens). 0.5 is gebruikelijk.
    'recaptcha_min_score'  => 0.5,

    // ---- E-mail ----
    // Naar wie de formulierinzendingen gestuurd worden.
    'mail_to'        => 'info@vhpn.nl',
    // Afzender. Moet een adres op uw eigen Hostnet-domein zijn (bv. een
    // mailbox als noreply@vhpn.nl), anders wordt de mail door SPF/DMARC
    // afgekeurd door ontvangers.
    'mail_from'      => 'noreply@vhpn.nl',
    'mail_from_name' => 'VHPN Website',
    // Reply-To wordt automatisch gevuld met het e-mailadres van de
    // afzender van het formulier; hier hoeft u niets aan te passen.

    // ---- CORS ----
    // Toegestane origins voor de API. Voeg uw domeinen toe.
    // Tijdens lokaal testen kunt u 'http://localhost:8080' toevoegen.
    'allowed_origins' => [
        'https://vhpn.nl',
        'https://www.vhpn.nl',
    ],
];
