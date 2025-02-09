export default function sortByDate(data) {
  let sortedArray = {};

  data.forEach((row) => {
    const date = row.Date;
    const hour = parseInt(row.Time.split(":")[0], 10); // Extract the hour

    // Initialize the date entry if it doesn't exist
    if (!sortedArray[date]) {
      sortedArray[date] = Array.from({ length: 24 }, () => []); // Create 24 arrays, one for each hour
    }

    sortedArray[date][hour].push(row);
  });

  return sortedArray;
}
