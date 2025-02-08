import { ClearMap, AddHeatMap } from "./general/filterFun.js";
import removeDublicates from "./sorting/removeDublicates.js";
import sortByDate from "./sorting/sortByDate.js";
import averageFromDublicates from "./sorting/averageFromDublicates.js";

export function convertToDataBase(pollutionData) {
  console.log("Displaying heatmap...");

  pollutionData = removeDublicates(pollutionData);
  pollutionData = sortByDate(pollutionData);
  pollutionData = averageFromDublicates(pollutionData);

  return pollutionData;
}

export function processNextCycle(pollutionData, timeIndex, heatmapLayer) {
  const dateIndex = "2024-06-01";

  /* pollutionData = averageFromDublicates(pollutionData); */
  let dataList = pollutionData[dateIndex][timeIndex];


  if (dataList.length !== 0) {
    heatmapLayer.setData({ data: dataList, min: 0.6, max: 2 });
  }
}
