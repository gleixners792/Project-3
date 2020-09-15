const bounds = L.LatLngBounds(L.LatLng(-90, -180), L.LatLng(90, 180))

// Creating map object
var map = L.map("map", {
  center: [30, 20],
    zoomSnap: .1,
    zoomDelta: .5,
    zoom: 2.5,
    minZoom: 2.5,
    maxZoom: 6,
    setMaxBounds: bounds,
    maxBoundsViscosity: 1,
});

// Adding tile layer
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    // noWrap: false,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
  accessToken: API_KEY
}).addTo(map);

// link local geojson data
var link = "static/data/worldmap.json";

var geojson;

  // // Link to GeoJSON
  d3.json(link, function(data) {
  //   // Creating a geoJSON layer with the retrieved data
    L.geoJson(data, {

    //   style: {
    //     // Border color
    //     color: "blue",
    //     weight: 1,
    //     fillOpacity: 0.8
    // },

      onEachFeature: function(feature, layer) {
        // Set mouse events to change map styling
        layer.on({
          
          // When a user's mouse touches a map feature, the mouseover event calls this function, that feature's opacity changes to 90% so that it stands out
          mouseover: function(event) {
            layer = event.target;
            layer.setStyle({
              fillOpacity: 0.8
            });
          },
          // When the cursor no longer hovers over a map feature - when the mouseout event occurs - the feature's opacity reverts back to 50%
          mouseout: function(event) {
            layer = event.target;
            layer.setStyle({
              fillOpacity: 0.3
            });
          },
          // When a feature (Country) is clicked, it is enlarged to fit the screen
          click: function(event) {
            map.fitBounds(event.target.getBounds());
          }
        });
        // Giving each feature a pop-up with information pertinent to it
        const popupMsg = `<center><h1><button id="selDataset" onclick="buttonOptionChanged(this)">${feature.properties.name}</button></h1> <hr> <h3># of Wines: ${feature.properties.total_wines}</h3> </center>`
          layer.bindPopup(popupMsg);
        // layer.bindPopup("<h1>" + feature.properties.name + "</h1> <hr> <h2>" + feature.properties.total_wines + "</h2>");
  
      }
  }).addTo(map);
});