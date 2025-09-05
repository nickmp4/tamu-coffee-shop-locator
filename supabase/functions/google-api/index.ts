// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs

// Securely get the env var
const GOOGLE_API_KEY = Deno.env.get("GOOGLE_API_KEY");
if (!GOOGLE_API_KEY) {
  throw new Error("Missing GOOGLE_API_KEY in environment");
}

// Allowed origins for CORS
const allowedOrigins = [
  "http://localhost:5173",
  "https://hcxmubtfpminwqqlknff.supabase.co"
];

Deno.serve(async (req) => {
  const origin = req.headers.get("origin") || "";
  const isAllowed = allowedOrigins.includes(origin);

  // Apply appropriate CORS headers
  const corsHeaders = {
    "Access-Control-Allow-Origin": isAllowed ? origin : "null",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
    "Vary": "Origin"
  };

  // Handle preflight request
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: corsHeaders
    });
  }

  // Parse query params
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("q");
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  const zoom = searchParams.get("zoom") || "14";

  // Validate params
  if (!query || !lat || !lng) {
    return new Response(JSON.stringify({ error: "Missing q, lat, or lng" }), {
      status: 400,
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json"
      }
    });
  }

  // Construct the embed URL
  const embedUrl = `https://www.google.com/maps/embed/v1/search?key=${GOOGLE_API_KEY}&q=${encodeURIComponent(query)}&center=${lat},${lng}&zoom=${zoom}`;

  return new Response(JSON.stringify({ url: embedUrl }), {
    status: 200,
    headers: {
      ...corsHeaders,
      "Content-Type": "application/json"
    }
  });
});



/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/google-api' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
    --header 'Content-Type: application/json' \
    --data '{"name":"Functions"}'

*/
