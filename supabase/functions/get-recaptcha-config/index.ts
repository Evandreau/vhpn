// Returns the public reCAPTCHA v3 site key so the frontend can load the widget.
// The site key is intentionally public; the secret key stays server-side.
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

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
