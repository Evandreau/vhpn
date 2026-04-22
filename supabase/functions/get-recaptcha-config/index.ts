// Returns the public reCAPTCHA v3 site key so the frontend can load the widget.
// The site key is intentionally public; the secret key stays server-side.
import { corsHeaders } from "@supabase/supabase-js/cors";

Deno.serve((req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  const siteKey = Deno.env.get("RECAPTCHA_SITE_KEY") ?? "";

  return new Response(JSON.stringify({ siteKey }), {
    headers: { ...corsHeaders, "Content-Type": "application/json" },
    status: 200,
  });
});
