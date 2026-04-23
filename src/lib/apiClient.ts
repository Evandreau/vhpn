/**
 * Centrale fetch client voor de PHP-backend op Hostnet.
 *
 * In productie (op vhpn.nl) draaien deze endpoints als PHP-bestanden onder
 * /api/. Tijdens lokale `npm run dev` werken ze niet — start een lokale
 * PHP-server met `php -S localhost:8080 -t dist` na een build, of zet een
 * Vite proxy op naar uw Hostnet staging.
 */

const API_BASE = '/api';

async function postJson<T = unknown>(path: string, body: unknown): Promise<T> {
  const res = await fetch(`${API_BASE}/${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body ?? {}),
  });
  const text = await res.text();
  let data: unknown = null;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    throw new Error(`Invalid JSON from /api/${path} (HTTP ${res.status})`);
  }
  if (!res.ok) {
    const msg = (data as { error?: string } | null)?.error ?? `HTTP ${res.status}`;
    throw new Error(msg);
  }
  return data as T;
}

async function getJson<T = unknown>(path: string): Promise<T> {
  const res = await fetch(`${API_BASE}/${path}`);
  const text = await res.text();
  let data: unknown = null;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    throw new Error(`Invalid JSON from /api/${path} (HTTP ${res.status})`);
  }
  if (!res.ok) {
    const msg = (data as { error?: string } | null)?.error ?? `HTTP ${res.status}`;
    throw new Error(msg);
  }
  return data as T;
}

// ---- Pararius --------------------------------------------------------------
export interface ParariusProxyResponse {
  success: boolean;
  contentType: string;
  rawResponse: string;
}

export const apiPararius = (params: { action?: string; lang?: string } & Record<string, string>) =>
  postJson<ParariusProxyResponse>('pararius.php', params);

// ---- reCAPTCHA -------------------------------------------------------------
export const apiRecaptchaConfig = () => getJson<{ siteKey: string }>('recaptcha-config.php');

export const apiRecaptchaVerify = (token: string, action: string) =>
  postJson<{ success: boolean; score?: number; action?: string }>('recaptcha-verify.php', {
    token,
    action,
  });

// ---- Contact / formulieren ------------------------------------------------
export type ContactFormType =
  | 'contact'
  | 'viewing'
  | 'landlord_contact'
  | 'landlord_property'
  | 'search_help';

export interface ContactPayload {
  form_type: ContactFormType;
  name: string;
  email: string;
  phone?: string | null;
  message?: string | null;
  // optionele context
  listing_id?: string | null;
  listing_url?: string | null;
  preferred_days?: string | null;
  preferred_timeslot?: string | null;
  rental_start_date?: string | null;
  rental_period?: string | null;
  preferred_area?: string | null;
  budget?: string | null;
  move_in_date?: string | null;
  gross_income?: number | null;
  partner_income?: number | null;
  // anti-spam
  company_website?: string;
  captcha_token?: string;
  captcha_action?: string;
}

export const apiContact = (payload: ContactPayload) =>
  postJson<{ success: boolean }>('contact.php', payload);
