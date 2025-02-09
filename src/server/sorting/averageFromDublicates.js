export default function averageFromDublicates(data) {
  console.log("Start Data:", JSON.parse(JSON.stringify(data)));

  for (const date in data) {
    for (let hour = 1; hour < 24; hour++) {
      const prevHourData = data[date][hour - 1];
      const currHourData = data[date][hour];

      const coordMap = new Map();

      const createCoordKey = (lat, lon) => {
        return `${lat.toFixed(3)},${lon.toFixed(3)}`;
      }
      const fixedFloat = (num) => {
        return Number.parseFloat(num.toFixed(3));
      };
        

      // Add previous hour data to the map
      prevHourData.forEach((point) => {
        const coordKey = createCoordKey(point.Latitude, point.Longitude);
        coordMap.set(coordKey, { Latitude: fixedFloat(point.Latitude), Longitude: fixedFloat(point.Longitude), CO: point.CO, count: 1 }); // Initialize with count 1
      });

      // Add current hour data to the map (averaging if the coordinate already exists)
      currHourData.forEach((point) => {
        const coordKey = createCoordKey(point.Latitude, point.Longitude);

        if (coordMap.has(coordKey)) {
          const existing = coordMap.get(coordKey);
          existing.CO =
            (existing.CO * existing.count + point.CO) / (existing.count + 1);
          existing.count += 1; // Update the count for averaging
          coordMap.set(coordKey, existing); // Update map with averaged data
        } else {
          coordMap.set(coordKey, {
            Latitude: fixedFloat(point.Latitude),
            Longitude: fixedFloat(point.Longitude),
            CO: point.CO,
            count: 1,
          });
        }
      });

      // Replace the current hour data with the averaged data from coordMap
      data[date][hour] = Array.from(coordMap.values()).map(
        ({ count, ...rest }) => rest
      );
    }
  }

  console.log("End Data:", data);

  return data;
}
