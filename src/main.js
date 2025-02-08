import { handleFiles } from "./js/general/fileInputHandler.js";
import { convertToDataBase, processNextCycle } from "./js/heatmapDisplay.js";

/* ------------------------ Drawing map itself ------------------ */
console.log("Map setup...");

var baseLayer = L.tileLayer(
  "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  {
    attribution:
      'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>',
    maxZoom: 18,
  }
);

var cfg = {
  scaleRadius: true,
  radius: 0.00038,
  /* radius: 10, */
  blur: 0,
  opacity: 1,
  /* useGradientOpacity: true, */
  // which field name in your data represents the latitude - default "lat"
  latField: "Latitude",
  // which field name in your data represents the longitude - default "lng"
  lngField: "Longitude",
  // which field name in your data represents the data value - default "value"
  valueField: "CO",
};

var heatmapLayer = new HeatmapOverlay(cfg);

var map = new L.Map("map", {
  center: new L.LatLng(50.45, 30.523),
  zoom: 12,
  layers: [baseLayer, heatmapLayer],
});

let pollutionData = {
  "2024-06-01": [
    [],
    [
      { Latitude: 50.455, Longitude: 30.525, CO: 1 },
      { Latitude: 50.456, Longitude: 30.525, CO: 2 },
    ],
    [
      { Latitude: 50.455, Longitude: 30.525, CO: 3 },
      { Latitude: 50.456, Longitude: 30.525, CO: 2 },
    ],
    [{ Latitude: 50.461, Longitude: 30.525, CO: 2 }],
    [
      { Latitude: 50.455, Longitude: 30.526, CO: 3 },
      { Latitude: 50.456, Longitude: 30.526, CO: 2 },
    ],
    [
      { Latitude: 50.455, Longitude: 30.52659, CO: 3 },
      { Latitude: 50.456, Longitude: 30.52656, CO: 2 },
    ],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
  ],
};

const createCoordKey = (lat, lon) => `${lat.toFixed(3)},${lon.toFixed(3)}`;

pollutionData["2024-06-01"][5].forEach((element) => {
  console.log(createCoordKey(element.Latitude, element.Longitude).split(","));
  
});

console.log("Map setup... DONE");

const timeSelector = document.getElementById("timeSelector");
const selectedTimeDisplay = document.getElementById("selectedTime");

timeSelector.addEventListener("input", function () {
  selectedTimeDisplay.textContent = `${timeSelector.value}:00`;

  processNextCycle(pollutionData, timeSelector.value - 1, heatmapLayer);
});

document
  .getElementById("fileInput")
  .addEventListener("change", async (event) => {
    let convertedData = await handleFiles(event);

    pollutionData = convertToDataBase(convertedData, map);
  });
