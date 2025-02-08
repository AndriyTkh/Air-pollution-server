import fs from 'node:fs/promises';
import { PATH_DB } from '../constants/contacts.js';

export default async function writeContacts(contactData) {
  console.log('Writing.....');

  try {
    await fs.writeFile(PATH_DB, JSON.stringify(contactData), 'utf8');
    console.log('Дані успішно записані в файл.');
  } catch (err) {
    console.error('Помилка запису в файл:', err);
  }
}
