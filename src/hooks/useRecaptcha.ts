import { useEffect, useRef, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";

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
  const { data, error } = await supabase.functions.invoke("get-recaptcha-config");
  if (error || !data?.siteKey) {
    throw new Error("Failed to load captcha configuration");
  }
  cachedSiteKey = data.siteKey as string;
  return cachedSiteKey;
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
 * React hook for Google reCAPTCHA v3.
 *
 * Loads the script on demand (once per page) and exposes:
 * - `ready`: true when the widget is loaded and an action can be executed
 * - `executeRecaptcha(action)`: returns a token to submit to the server
 * - `verifyToken(token, action)`: server-side verification via edge function
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
        // grecaptcha.ready resolves once the widget is actually usable
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
      const { data, error } = await supabase.functions.invoke("verify-recaptcha", {
        body: { token, action },
      });
      if (error) {
        console.error("Captcha verify error", error);
        return false;
      }
      return Boolean(data?.success);
    },
    [],
  );

  return { ready, executeRecaptcha, verifyToken };
};
