// Creating map object

const bounds = L.LatLngBounds(L.LatLng(-90, -180), L.LatLng(90, 180))

var myMap = L.map("mapPlot", {
	center: [35, 20],
	zoom: 2.2,
	minZoom: 1.5,
	maxZoom: 4.5,
});

// Adding tile layer

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
		attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
		maxZoom: 18,
		noWrap: false,
		id: 'mapbox/dark-v9',
		tileSize: 512,
		zoomOffset: -1,
	accessToken: API_KEY
}).addTo(myMap);

//var link = "static/data/worldmap.json";

(async function buildMap() {

	// Link to GeoJSON

	const path = "/mapData"
	const data = await d3.json(path);

	// Create a new choropleth layer

	const geojson = L.choropleth(data, {

		// Define what  property in the features to use

		valueProperty: "total_wines",

		// Set color scale

		colors: ['#fff7f3', '#fde0dd', '#fcc5c0', '#fa9fb5', '#f768a1', '#dd3497', '#ae017e', '#7a0177'],
		
		// Number of breaks in step range

		steps: 8,

		// q for quartile, e for equidistant, k for k-means

		mode: "q",
		style: {
			// Border color
			color: "#fff",
			weight: 1,
			fillOpacity: 0.8
		},

		// Binding a pop-up to each layer

		onEachFeature: function (feature, layer) {
			layer.on({
							
				// When a feature (Country) is clicked, it is enlarged to fit the screen

				click: function(event) {
					myMap.fitBounds(event.target.getBounds());
				},
		})
			
			const popupMsg = `<center><h5><button id="selDataset" onclick="buttonOptionChanged(this)">${feature.properties.name}</button></h5># of Wines: ${feature.properties.total_wines}</center>`
			layer.bindPopup(popupMsg);
		},

	}).addTo(myMap);

	// Set up the legend

	const legend = L.control({
		position: "bottomleft"
	});
	legend.onAdd = function () {
		const div = L.DomUtil.create("div", "info legend");
		const limits = geojson.options.limits;
		const colors = geojson.options.colors;

		// Add min & max

		const legendInfo = "<center>Wines per Country</center>" +
			"<div class=\"labels\">" +
			"<div class=\"min\">" + limits[0] + "</div>" +
			"<div class=\"max\">" + limits[limits.length - 1] + "</div>" +
			"</div>";

		div.innerHTML = legendInfo;

		const labels = limits.map((limit, index) => {
			return "<li style=\"background-color: " + colors[index] + "\"></li>"
		})

		div.innerHTML += "<ul>" + labels.join("") + "</ul>";
		return div;
	};

	// Adding legend to the map

	legend.addTo(myMap);
})()