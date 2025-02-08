export function handleFiles(event) {
  console.log("Converting files...");

  return new Promise((resolve) => {
    const files = event.target.files;

    if (files.length === 0) {
      alert("Please select one or more CSV files.");
      return;
    }

    let combinedData = [];

    for (let i = 0; i < files.length; i++) {
      let file = files[i];
      let reader = new FileReader();

      reader.onload = function (e) {
        Papa.parse(e.target.result, {
          header: true,
          dynamicTyping: true,
          complete: function (results) {
            let validData = results.data.slice(0, -1);
            combinedData = combinedData.concat(validData);

            if (i === files.length - 1) {
              resolve(combinedData);
            }
          },
          error: function (error) {
            console.error("Error parsing file:", error);
          },
        });
      };

      reader.readAsText(file);

      console.log("Converting files... DONE");
    }
  });
}
