# VHPN — Deployment naar Hostnet shared hosting

Statische React-site (Vite build) met PHP-backend voor Pararius proxy,
formulier-mailer en reCAPTCHA serverside verificatie. Volledig zelfstandig:
geen Lovable Cloud / Supabase nodig in productie.

## 1. Bouwen

```bash
npm install
npm run build
```

Output staat in `dist/`. Deze map bevat:

```
dist/
├── index.html
├── assets/...                  ← gehashte JS/CSS bundels
├── .htaccess                   ← Apache: HTTPS, www→apex, SPA fallback
└── api/                        ← PHP backend
    ├── .htaccess               ← blokkeert config.php publiek
    ├── _bootstrap.php
    ├── config.example.php      ← KOPIEER naar config.php op de server
    ├── pararius.php            ← proxy naar Pararius Office API
    ├── recaptcha-config.php    ← geeft site key aan frontend
    ├── recaptcha-verify.php    ← serverside captcha verificatie
    └── contact.php             ← mailt formulieren naar info@vhpn.nl
```

## 2. Uploaden naar Hostnet (FTP/SFTP)

1. Upload de **inhoud** van `dist/` naar de webroot van uw Hostnet pakket
   (vaak `httpdocs/` of `public_html/`). De `index.html` moet direct in de
   webroot staan, en de `api/` map ernaast.
2. Op de server: kopieer `api/config.example.php` naar `api/config.php` en
   vul de echte waarden in:
   - `pararius_api_key` — uit Pararius Office (zelfde key die in Lovable
     Cloud stond)
   - `recaptcha_site_key` + `recaptcha_secret_key` — Google reCAPTCHA v3
     console
   - `mail_from` — een echt mailadres op vhpn.nl (bv. `noreply@vhpn.nl`),
     anders wordt de mail door SPF/DMARC afgekeurd
3. Zorg dat `config.php` rechten `0600` of `0640` heeft.
4. Activeer SSL in het Hostnet controlepaneel voor `vhpn.nl` en
   `www.vhpn.nl` (Let's Encrypt is gratis).

## 3. DNS bij Hostnet

A-record en eventueel AAAA-record op `vhpn.nl` en `www.vhpn.nl` naar het IP
van uw Hostnet pakket. **MX-records voor e-mail niet aanraken.**

## 4. reCAPTCHA console

Voeg `vhpn.nl` en `www.vhpn.nl` toe aan toegestane domeinen in
https://www.google.com/recaptcha/admin.

## 5. Controle na deploy

- `https://vhpn.nl/` toont de homepage
- `https://vhpn.nl/listings` laadt live aanbod uit Pararius
- `https://vhpn.nl/listings` na refresh: geen 404 (SPA fallback werkt)
- `https://vhpn.nl/api/recaptcha-config.php` geeft `{"siteKey":"..."}`
- Test elk formulier: e-mail moet aankomen op `info@vhpn.nl`
- `https://vhpn.nl/api/config.php` moet **403/404** geven (mag NIET zichtbaar)
- Response van `/api/pararius.php` bevat **geen** `number`, `addition` of
  PC6-zipcode meer (alleen PC4). Header `X-VHPN-Cache: HIT|MISS|STALE`
  laat zien dat de server-side cache werkt.

## Privacy

Huisnummer en toevoeging worden in **drie lagen** gestript:

1. Server-side in `public/api/pararius.php` — `number`, `addition`,
   `housenumber`, `house_number`, `number_addition` worden uit elke
   property verwijderd vóórdat de JSON naar de browser gaat. `zipcode`
   wordt teruggebracht tot PC4.
2. Bij vertrouwelijke woningen (`vertrouwelijk=1` / `confidential=1`)
   worden óók `street`, `lat` en `lng` leeggemaakt — alleen district +
   city blijven over.
3. Frontend (`src/lib/address.ts`, `useParariusListings.ts`) gebruikt
   alleen straat + stad voor titel, slug en SEO/JSON-LD.

## Mail transport

Default = PHP `mail()` van Hostnet. Voor betere deliverability kunt u in
`api/config.php` `mail_transport` op `'smtp'` zetten en de `smtp_*`
velden vullen met de Hostnet mailbox (smtp.hostnet.nl, poort 465 SSL).
Geen codewijziging nodig.

## Pararius caching

`api/pararius.php` cachet de Pararius response file-based in
`sys_get_temp_dir()` met TTL `pararius_cache_ttl` (default 600 s). Bij
een Pararius timeout of 5xx wordt automatisch de laatst opgeslagen
cache geserveerd (`X-VHPN-Cache: STALE`).

## Lokaal testen van de PHP API

`npm run dev` start alleen de frontend (Vite, port 8080) — PHP draait niet.
Voor end-to-end test:

```bash
npm run build
php -S localhost:8000 -t dist
```

Open `http://localhost:8000`. Vul `dist/api/config.php` in met test-keys.
