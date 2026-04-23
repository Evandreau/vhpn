import { useEffect, useRef, useState, useCallback } from "react";
import { apiRecaptchaConfig, apiRecaptchaVerify } from "@/lib/apiClient";

declare global {
  interface Window {
    grecaptcha?: {
      ready: (cb: () => void) => void;
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
    };
  }
}

let cachedSiteKey: string | null = null;
let scriptLoadPromise: Promise<void> | null = null;

const fetchSiteKey = async (): Promise<string> => {
  if (cachedSiteKey) return cachedSiteKey;
  try {
    const data = await apiRecaptchaConfig();
    if (!data?.siteKey) throw new Error("No site key");
    cachedSiteKey = data.siteKey;
    return cachedSiteKey;
  } catch (err) {
    throw new Error("Failed to load captcha configuration");
  }
};

const loadScript = (siteKey: string): Promise<void> => {
  if (scriptLoadPromise) return scriptLoadPromise;
  if (typeof window === "undefined") return Promise.resolve();
  if (window.grecaptcha) return Promise.resolve();

  scriptLoadPromise = new Promise((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(
      'script[data-recaptcha="true"]',
    );
    if (existing) {
      existing.addEventListener("load", () => resolve(), { once: true });
      existing.addEventListener("error", () => reject(new Error("Captcha script failed")), {
        once: true,
      });
      return;
    }
    const script = document.createElement("script");
    script.src = `https://www.google.com/recaptcha/api.js?render=${encodeURIComponent(siteKey)}`;
    script.async = true;
    script.defer = true;
    script.dataset.recaptcha = "true";
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Captcha script failed"));
    document.head.appendChild(script);
  });
  return scriptLoadPromise;
};

/**
 * React hook voor Google reCAPTCHA v3.
 * - `ready`: true zodra het widget bruikbaar is
 * - `executeRecaptcha(action)`: levert een token om aan de server te geven
 * - `verifyToken(token, action)`: server-side verificatie via /api/recaptcha-verify.php
 */
export const useRecaptcha = () => {
  const [ready, setReady] = useState(false);
  const siteKeyRef = useRef<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const key = await fetchSiteKey();
        if (cancelled || !key) return;
        siteKeyRef.current = key;
        await loadScript(key);
        if (cancelled) return;
        await new Promise<void>((resolve) => {
          if (window.grecaptcha) window.grecaptcha.ready(() => resolve());
          else resolve();
        });
        if (!cancelled) setReady(true);
      } catch (err) {
        console.error("Captcha init failed", err);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const executeRecaptcha = useCallback(async (action: string): Promise<string> => {
    const siteKey = siteKeyRef.current;
    if (!siteKey || !window.grecaptcha) {
      throw new Error("Captcha not ready");
    }
    return window.grecaptcha.execute(siteKey, { action });
  }, []);

  const verifyToken = useCallback(
    async (token: string, action: string): Promise<boolean> => {
      try {
        const data = await apiRecaptchaVerify(token, action);
        return Boolean(data?.success);
      } catch (err) {
        console.error("Captcha verify error", err);
        return false;
      }
    },
    [],
  );

  return { ready, executeRecaptcha, verifyToken };
};
