let socket=io();   //from it a connection request goes at backend

if(navigator.geolocation) //checking presence of geoloaction
{
    navigator.geolocation.watchPosition((position)=>{       //for watching position
    const {latitude,longitude}=position.coords;
    socket.emit("send-location",{latitude,longitude});       //send-location is an event
    },
    (error)=>{
        console.error(error);
    },
    {
        enableHighAccuracy:true,
        timeout:5000,
        maximumAge:0
    }
);          
}

const map=L.map("map").setView([0,0],16);

//for world map
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{
    attribution:"Open_Street_Map"
}).addTo(map);


const markers={};        //creating marker object

socket.on("receive-location",(data)=>{
    const {id,latitude,longitude}=data;
    map.setView([latitude,longitude]);
    if(markers[id])
    {
        markers[id].setLatLang([latitude,longitude])
    }
    else
    {
        markers[id]=L.marker([latitude,longitude]).addTo(map);
    }
});

socket.on("user-disconnected",(id)=>{                  //for disconnection
   if(markers[id])
   {
    map.removeLayer(markers[id]);
    delete markers[id];
   }
});                 