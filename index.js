const { Command } = require("commander");
const contactsOperations = require("./contacts");

const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      (async () => {
        try {
          const contactList = await contactsOperations.listContacts();
          console.table(contactList);
        } catch (error) {
          console.log(error.message);
        }
      })();
      break;

    case "get":
      (async () => {
        try {
          const contactById = await contactsOperations.getContactById(+id);
          console.table(contactById);
        } catch (error) {
          console.log(error.message);
        }
      })();
      break;

    case "add":
      (async () => {
        try {
          const newContact = await contactsOperations.addContact(
            name,
            email,
            phone
          );
          console.table(newContact);
        } catch (error) {
          console.log(error.message);
        }
      })();
      break;

    case "remove":
      (async () => {
        try {
          const removedContact = await contactsOperations.removeContact(+id);
          console.table(removedContact);
        } catch (error) {
          console.log(error.message);
        }
      })();
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
