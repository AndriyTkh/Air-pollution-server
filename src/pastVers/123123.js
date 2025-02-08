import {
  removeDublicates,
  ClearMap,
  sortByDate,
  AddHeatMap,
} from "./filterFun.js";
import {
  initializeDate,
  formatDate,
  changeDay,
  changeHour,
  formatTime,
} from "./dateFun.js";

export function displayHeatmap(pollutionData, map) {
  console.log("Displaying heatmap...");

  ClearMap(map);
  pollutionData = removeDublicates(pollutionData);
  pollutionData = sortByDate(pollutionData);

  console.log(pollutionData);

  let dateDT = initializeDate("2024-06-01", "00:00:00");
  let dateIndex;
  let timeIndex;

  /* ---------- Setting an interval ------------ */

  const intervalId = setInterval(async () => {
    dateIndex = formatDate(dateDT);
    timeIndex = dateDT.getHours();

    console.log(dateIndex);

    const timeDisplay = document.getElementById("selectedTime");
    timeDisplay.textContent = `Current date: ${dateIndex}, time: ${formatTime(
      dateDT
    )}`;

    if (pollutionData[dateIndex][timeIndex]) {
      let dataList = pollutionData[dateIndex][timeIndex];
      ClearMap(map);

      dataList = dataList.map((row) => {
        return [row.Latitude, row.Longitude, row.CO];
      });

      AddHeatMap(dataList, map);
    }

    dateDT = changeHour(dateDT, 1);

    /* ------ Checking for end of the day ------ */

    if (timeIndex >= 24) {
      if (dateDT.time) {
        clearInterval(intervalId);
      }
      dateDT.setHours(0);
      dateDT = changeDay(dateDT, 1);
    }
  }, 500);
}
