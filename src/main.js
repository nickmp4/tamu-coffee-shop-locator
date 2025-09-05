import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
)

// document.querySelector('#call-function').addEventListener('click', async () => {
//   try {
//     const { data, error } = await supabase.functions.invoke('hello-world', {
//       body: { name: 'Nick' },
//     })

//     if (error) {
//       console.error('Function error:', error)
//     } else {
//       console.log('Function result:', data)
//       document.querySelector('#output').textContent = data.message
//     }
//   } catch (err) {
//     console.error('Unexpected error:', err)
//   }
// })

async function getEmbedUrl() {

  const q = "coffee shops in Bryan";
  const lat = 30.61757;
  const lng = -96.33881;
  const zoom = 14;

  const url = new URL("https://hcxmubtfpminwqqlknff.functions.supabase.co/google-api");
  url.searchParams.set("q", q);
  url.searchParams.set("lat", lat.toString());
  url.searchParams.set("lng", lng.toString());
  url.searchParams.set("zoom", zoom.toString());

  const res = await fetch(url.toString(), {
  method: "GET",
  headers: {
    "Authorization": `Bearer ` + import.meta.env.VITE_SUPABASE_ANON_KEY,
  },
});

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "Unknown error from edge function");
  }

  return data.url;
}

getEmbedUrl().then((url) => {
  if (!url) return;

  const iframe = document.createElement("iframe");
  iframe.src = url;
  iframe.width = "100%";
  iframe.height = "450";
  iframe.style.border = "0";
  iframe.loading = "lazy";
  iframe.allowFullscreen = true;
  iframe.referrerPolicy = "no-referrer-when-downgrade";

  document.getElementById("map-container").appendChild(iframe);
});



// function initMap() {
//     const tamu = {lat: 30.617570170770634, lng: -96.33881838286645}
//     const map = new google.maps.Map(document.getElementById("map"), 
//     {
//         zoom: 17.56,
//         center: tamu,
//     });
// }

// async function callBackEnd() {
//     const { data } = await supabase.functions.invoke('hello-world', {
//         body: {
//             name: "testdummy",
//         },
//     });
//     console.log(data);
//     return data;
// }

// function callBackEnd2(){
//     console.log("testing calling function")
// }

// window.callBackEnd = callBackEnd;