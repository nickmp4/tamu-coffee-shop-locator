// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs

const allowedOrigins = [
  "http://localhost:5173",
  "https://hcxmubtfpminwqqlknff.supabase.co",
]

Deno.serve(async (req) => {

  const origin = req.headers.get("origin") || "";

  // Check if origin is in the allowed list
  const isAllowedOrigin = allowedOrigins.includes(origin);

  const corsHeaders = {
    "Access-Control-Allow-Origin": isAllowedOrigin ? origin : "",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
    "Vary": "Origin", // Good practice for caching proxies
  };

  // Handle preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { status: 200, headers: corsHeaders })
  }

  // Check auth header
  const authHeader = req.headers.get('authorization')
  if (!authHeader) {
    return new Response(JSON.stringify({ error: "Missing authorization header" }), {
      status: 401,
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json',
      },
    })
  }

  // Parse body
  const body = await req.json()

  return new Response(JSON.stringify({ message: `Hello ${body.name || "World"}` }), {
    status: 200,
    headers: {
      ...corsHeaders,
      'Content-Type': 'application/json',
    },
  })
})


/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/hello-world' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
    --header 'Content-Type: application/json' \
    --data '{"name":"Functions"}'

*/
