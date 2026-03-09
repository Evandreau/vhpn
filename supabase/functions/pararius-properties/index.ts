import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const apiKey = Deno.env.get('PARARIUS_API_KEY');
    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: 'API key not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const { action = 'getproperties', lang = 'en', ...extraParams } = await req.json().catch(() => ({}));

    const apiUrl = 'https://api.parariusoffice.nl/db.php';
    
    const params = new URLSearchParams({
      key: apiKey,
      action,
      lang,
      version: '3',
      'client-version': '4.0.1',
      ...extraParams,
    });

    console.log(`Fetching from Pararius Office API: action=${action}`);
    
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    });

    const contentType = response.headers.get('content-type') || '';
    const responseText = await response.text();
    
    console.log('Response status:', response.status);
    console.log('Content-Type:', contentType);
    console.log('Response preview (first 2000 chars):', responseText.substring(0, 2000));

    if (!response.ok) {
      return new Response(
        JSON.stringify({ 
          error: 'Pararius API error', 
          status: response.status,
          statusText: response.statusText,
          body: responseText.substring(0, 500)
        }),
        { status: response.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Return raw response for now so we can inspect the format
    return new Response(
      JSON.stringify({ 
        success: true,
        contentType,
        rawResponse: responseText 
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
