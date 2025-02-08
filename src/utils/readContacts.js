import fs from 'node:fs/promises';
import { PATH_DB } from '../constants/contacts.js';

export default async function readContacts() {
  console.log('Reading.....');

  try {
    const data = JSON.parse(await fs.readFile(PATH_DB, 'utf8'));
    return data;
  } catch (err) {
    console.error('Помилка читання файлу:', err);
  }
}
