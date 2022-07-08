const { program } = require('commander');

const contactsOperations = require("./contacts");

program
  .option('-a, --action <type>')
  .option('-i, --id <type>')
  .option('-n, --name <type>')
  .option('-e, --email <type>')
  .option('-p, --phone <type>');

program.parse(process.argv);

const argv = program.opts();

const invokeAction = async({ action, id, name, email, phone }) => {
  switch (action) {
    case 'list':
          const allContacts = await contactsOperations.listContacts();
          console.table(allContacts)
      break;

    case 'get':
          const contact = await contactsOperations.getContactById(id);
          if (!contact) {
              throw new Error(`Contact with this ${id} not found`);
          };
          console.log(contact);
      break;

    case 'add':
          const newContact = await contactsOperations.addContact(name, email, phone,);
          console.log(newContact);
          break;
      
      case 'updateById':
          const updateContact = await contactsOperations.updateContact(id, name, email, phone);
          console.log(updateContact);
          break;

    case 'remove':
          const removeContact = await contactsOperations.removeContact(id);
          console.log(removeContact);
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

invokeAction(argv);