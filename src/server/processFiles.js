import fs from 'fs-extra';
import path from 'path';
import Papa from 'papaparse';

/**
 * 
 * Reads all .cls files, parses them, and saves output to a JSON file.
 *
 * @param {string} sourceFolder - Folder containing .cls files.
 * @param {string} outputFolder - Folder where JSON data should be saved.
 * @returns {Promise<Array>} - Combined parsed data.
 */

export async function processFilesInFolder(sourceFolder, outputFolder) {
  try {
    // Ensure output folder exists
    await fs.ensureDir(outputFolder);

    // Get all files in the data folder
    const files = await fs.readdir(sourceFolder);
    const clsFiles = files.filter(
      (file) => path.extname(file).toLowerCase() === '.csv',
    );

    let combinedData = [];

    for (const file of clsFiles) {
      const filePath = path.join(sourceFolder, file);
      const fileContents = await fs.readFile(filePath, 'utf8');

      const results = await new Promise((resolve, reject) => {
        Papa.parse(fileContents, {
          header: true,
          dynamicTyping: true,
          complete: (results) => resolve(results),
          error: (error) => reject(error),
        });
      });

      // Remove any empty last lines
      let validData = results.data.slice(0, -1);
      combinedData = combinedData.concat(validData);
    }

    console.log(`✅ Processed data saved`);
    return combinedData;
  } catch (err) {
    console.error('❌ Error processing files:', err);
    throw err;
  }
}
