import express from 'express';
import fs from 'fs-extra';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { processFilesInFolder } from './processFiles.js';

import removeDublicates from './sorting/removeDublicates.js';
import averageFromDublicates from './sorting/averageFromDublicates.js';
import sortByDate from './sorting/sortByDate.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Get current directory (__dirname equivalent in ES modules)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataFolder = path.join(__dirname, '../csl-database'); // Source folder
const databaseFolder = path.join(__dirname, '../database'); // Destination folder
const databaseFile = path.join(databaseFolder, 'processed_data.json'); //File

app.use(cors());
app.use(express.json());

// API to check if database file exists and return its contents
app.get('/database', async (req, res) => {
  try {
    // Check if the file exists
    const exists = await fs.pathExists(databaseFile);

    if (!exists) {
      return res.status(404).json({ error: 'Database file not found.' });
    }

    // Read file contents
    const data = await fs.readJson(databaseFile);
    res.json({ message: 'Database file found', data });
  } catch (error) {
    console.error('❌ Error reading database file:', error);
    res.status(500).json({ error: 'Failed to read database file.' });
  }
});

// API to process files and save the output as JSON
app.get('/process', async (req, res) => {
  try {
    let pollutionData = await processFilesInFolder(dataFolder, databaseFolder);

    pollutionData = removeDublicates(pollutionData);
    pollutionData = sortByDate(pollutionData);
    pollutionData = averageFromDublicates(pollutionData);

    // Save processed data to JSON file
    const outputFilePath = path.join(databaseFolder, 'processed_data.json');
    await fs.writeJson(outputFilePath, pollutionData, { spaces: 2 });

    res.json({
      message: 'Processing complete',
      file: 'processed_data.json',
      data: pollutionData,
    });
  } catch (error) {
    console.error('Error processing files:', error);
    res.status(500).json({ error: 'Failed to process files.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
