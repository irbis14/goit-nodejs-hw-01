const fs = require("fs/promises");
const url = require("url");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

contactsPath = path.join(__dirname, "db/contacts.json");

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath);
    return (contacts = JSON.parse(data)); //возвращает JSON
  } catch (error) {
    throw error;
  }
};

const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts();
    return (contact = contacts.filter((item) => item.id === contactId));
  } catch (error) {
    throw error;
  }
};

const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts();
    const index = contacts.findIndex((item) => item.id === contactId);
    if (index === -1) {
      throw new Error(`Contacts with id=${contactId} not found`);
    }
    const restContacts = contacts.filter((item) => item.id !== contactId);
    const restContactsString = JSON.stringify(restContacts);
    await fs.writeFile(contactsPath, restContactsString);
  } catch (error) {}
};

const addContact = async (name, email, phone) => {
  try {
    const contacts = await listContacts();
    const newContact = {
      id: uuidv4(),
      name,
      email,
      phone,
    };
    const newContactString = JSON.stringify(newContact);
    if (contacts.find((contact) => contact.name === name)) {
      throw new Error(`Contact "${name}" is already exist`);
    }
    await fs.appendFile(contactsPath, newContactString);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};

/* // Выводит данные в консоль
(async () => {
  try {
    const allContacts = await listContacts();
    console.log(allContacts, "--listContacts");
  } catch (error) {
    console.log(error.message);
  }
})();

// Ничего не выводит: Promise { <pending> } --listContacts
const allContacts = listContacts();
console.log(allContacts, "--listContacts");

// А так выводит
const allContacts = listContacts().then;
console.log(allContacts, "--listContacts"); */
