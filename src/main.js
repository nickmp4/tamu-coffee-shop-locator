import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
)

document.querySelector('#call-function').addEventListener('click', async () => {
  try {
    const { data, error } = await supabase.functions.invoke('hello-world', {
      body: { name: 'Nick' },
    })

    if (error) {
      console.error('Function error:', error)
    } else {
      console.log('Function result:', data)
      document.querySelector('#output').textContent = data.message
    }
  } catch (err) {
    console.error('Unexpected error:', err)
  }
})


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