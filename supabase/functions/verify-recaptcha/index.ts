// Server-side verification of a reCAPTCHA v3 token.
// Returns { success, score, action } or { success: false, error }.
import { corsHeaders } from "@supabase/supabase-js/cors";

const MIN_SCORE = 0.5;

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ success: false, error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const secret = Deno.env.get("RECAPTCHA_SECRET_KEY");
  if (!secret) {
    console.error("RECAPTCHA_SECRET_KEY not configured");
    return new Response(JSON.stringify({ success: false, error: "Captcha not configured" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  let body: { token?: unknown; action?: unknown };
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ success: false, error: "Invalid JSON" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const token = typeof body.token === "string" ? body.token : "";
  const expectedAction = typeof body.action === "string" ? body.action : "";

  if (!token) {
    return new Response(JSON.stringify({ success: false, error: "Missing captcha token" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    const params = new URLSearchParams();
    params.set("secret", secret);
    params.set("response", token);

    const googleResp = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params.toString(),
    });

    const data = (await googleResp.json()) as {
      success: boolean;
      score?: number;
      action?: string;
      "error-codes"?: string[];
    };

    if (!data.success) {
      console.warn("reCAPTCHA verification failed:", data["error-codes"]);
      return new Response(
        JSON.stringify({ success: false, error: "Captcha verification failed" }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    if (expectedAction && data.action && data.action !== expectedAction) {
      console.warn("reCAPTCHA action mismatch:", { expected: expectedAction, got: data.action });
      return new Response(
        JSON.stringify({ success: false, error: "Captcha action mismatch" }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const score = typeof data.score === "number" ? data.score : 0;
    if (score < MIN_SCORE) {
      console.warn("reCAPTCHA score too low:", score);
      return new Response(
        JSON.stringify({ success: false, error: "Captcha score too low", score }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    return new Response(JSON.stringify({ success: true, score, action: data.action }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("reCAPTCHA verification error:", err);
    return new Response(JSON.stringify({ success: false, error: "Verification error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
