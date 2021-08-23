const fs = require("fs/promises");
const url = require("url");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

contactsPath = path.join(__dirname, "db/contacts.json");

const update = async (items) => {
  const itemsString = JSON.stringify(items);
  await fs.writeFile(contactsPath, itemsString);
};

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath);
    return (contacts = JSON.parse(data));
  } catch (error) {
    throw error;
  }
};

const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts();
    const contactById = contacts.filter((item) => item.id === contactId);
    return contactById;
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
    await update(restContacts);
    return contacts[index];
  } catch (error) {
    throw error;
  }
};

const addContact = async (name, email, phone) => {
  try {
    const contacts = await listContacts();
    const data = {
      name,
      email,
      phone,
    };
    const newContact = { ...data, id: uuidv4() };
    // const newContactString = JSON.stringify(newContact);
    if (contacts.find((contact) => contact.name === name)) {
      throw new Error(`Contact "${name}" is already exist`);
    }
    contacts.push(newContact);
    await update(contacts);
    return newContact;
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
