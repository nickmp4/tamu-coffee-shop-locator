// const supabase = require('../supabase');
import { supabase } from '../supabase.js';

// function initMap() {
//     const tamu = {lat: 30.617570170770634, lng: -96.33881838286645}
//     const map = new google.maps.Map(document.getElementById("map"), 
//     {
//         zoom: 17.56,
//         center: tamu,
//     });
// }

async function callBackEnd() {
    const { data } = await supabase.functions.invoke('hello-world', {
        body: {
            name: "testdummy",
        },
    });
    console.log(data);
    return data;
}

function callBackEnd2(){
    console.log("testing calling function")
}

window.callBackEnd = callBackEnd;