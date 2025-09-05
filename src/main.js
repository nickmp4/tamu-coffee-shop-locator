import { createClient } from '@supabase/supabase-js'

//create the client that will interface with supabase, url and key stored in .env
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
)

//get the url to embed into the website
async function getEmbedUrl() {

  //parameters:
  const q = "coffee shops in College Station"; //query, aka what are we looking for
  const lat = 30.61757; //coords
  const lng = -96.33881; //centered on evans because #lockedin
  const zoom = 14; //how zoomed in do we want it to be

  const url = new URL("https://hcxmubtfpminwqqlknff.functions.supabase.co/google-api"); //url to access the supabase function
  //set parameters
  url.searchParams.set("q", q);
  url.searchParams.set("lat", lat.toString());
  url.searchParams.set("lng", lng.toString());
  url.searchParams.set("zoom", zoom.toString());

  //get the response from the supabase function "google-api" with specified parameters
  const res = await fetch(url.toString(), {
  method: "GET",
  headers: {
    "Authorization": `Bearer ` + import.meta.env.VITE_SUPABASE_ANON_KEY,
  }, //authorize the request
});

  const data = await res.json(); //extract data from response

  if (!res.ok) { //if there is some issue with data, throw error
    throw new Error(data.error || "Unknown error from edge function");
  }

  //return url given by supabase
  return data.url;
}

getEmbedUrl().then((url) => { //once url is retrieved, run this
  if (!url) return; //if no valid url, return

  const iframe = document.createElement("iframe"); //create an iframe where the div is
  //iframe options, changing these affects how the website sees it
  iframe.src = url;
  iframe.width = "100%";
  iframe.height = "450";
  iframe.style.border = "0";
  iframe.loading = "lazy";
  iframe.allowFullscreen = true;
  iframe.referrerPolicy = "no-referrer-when-downgrade";

  //add iframe to div
  document.getElementById("map-container").appendChild(iframe);
});
