export default function removeDublicates(heatData) {
  console.log(heatData);

  let cleanData = [];
  for (let index = 0; index < heatData.length - 1; index++) {
    const a = heatData[index];
    const b = heatData[index + 1];

    if (a.Latitude !== b.Latitude && a.Longitude != b.Longitude) {
      cleanData.push(heatData[index]);
    }
  }
  cleanData.push(heatData[heatData.length - 1]);

  console.log("Dublicates filtered.");
  return cleanData;
}
