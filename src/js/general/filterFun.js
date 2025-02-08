export function ClearMap(heat) {
  heat.clear();
}

export function AddHeatMap(heatData, heatmapLayer) {
  /* var heat = L.heatLayer(heatData, {
    radius: 15,
    minOpacity: 0,
    blur: 0,
    maxZoom: 15,
    max: 2,
    gradient: { 0.4: "lime", 0.65: "yellow", 1: "red" },
  }).addTo(map); */
}

export const asyncTimeout = (ms) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};
