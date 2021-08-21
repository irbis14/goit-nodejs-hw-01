const contactsOperations = require("./contacts");

/* (async () => {
  try {
    const allContacts = await contactsOperations.listContacts();
    console.log(allContacts, "---listContacts");

    const contactById = await contactsOperations.getContactById(2);
    console.log(contactById, "---getContactById");

    const removeContact = await contactsOperations.removeContact(3);
    console.log(removeContact, "---removeContact");

    const addcontact = await contactsOperations.addContact(
      "Nina",
      "nina@gmail.com",
      "1234567"
    );
    console.log(addcontact, "---addContact");
  } catch (error) {
    console.log(error.message);
  }
})(); */
