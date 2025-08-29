// const supabase = require('../supabase');
import { supabase } from './supabase.js';

document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('call-function')
  const output = document.getElementById('output')

  btn.addEventListener('click', async () => {
    const { data, error } = await supabase.functions.invoke('hello-world', {
      body: { name: 'Vite User' }
    })
    console.log("test");

    if (error) {
      console.error(error)
      output.textContent = 'Error: ' + error.message
    } else {
      output.textContent = data.message
    }
  })
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