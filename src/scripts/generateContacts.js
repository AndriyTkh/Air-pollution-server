import { createFakeContact } from '../utils/createFakeContact.js';
import readContacts from '../utils/readContacts.js';
import writeContacts from '../utils/writeContacts.js';

const generateContacts = async (number) => {
  let data = [];
  for (let index = 0; index < number; index++) {
    data.push(createFakeContact());
  }

  console.log(data);

  try {
    let DB_Data = await readContacts();
    if (DB_Data != null) {
      data = DB_Data.concat(data);
    }

    writeContacts(data);
  } catch (error) {
    console.log(error);
  }
};

generateContacts(5);
