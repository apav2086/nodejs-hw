// Import required modules: 'fs/promises' for file system operations, 'path' for file path manipulation, and 'uuid' for generating unique IDs.
const fs = require("fs/promises");
const path = require("path");
const { v4 } = require("uuid");

// Define the file path to the 'contacts.json' data file.
const filePath = path.join(__dirname, "contacts.json");

// Function to get all contacts from the 'contacts.json' file.
const getAllContacts = async () => {
  // Read the content of the 'contacts.json' file asynchronously using 'fs.readFile'.
  const data = await fs.readFile(filePath);

  // Parse the data into a JavaScript object (an array of contacts) using JSON.parse.
  const contacts = JSON.parse(data);

  // Return the contacts array to the caller.
  return contacts;
};

const getContactById = async (contactId) => {
  const contacts = await getAllContacts();
  const singleContact = contacts.find(
    (item) => item.id === contactId.toString()
  );
  if (!singleContact) {
    return null;
  }

  return singleContact;
};


const removeContact = async (contactId) => {
  const data = await getAllContacts();
  const newData = data.filter((item) => item.id !== contactId);
  await fs.writeFile(filePath, JSON.stringify(newData));
  return newData;
};
  





// Function to add a new contact to the 'contacts.json' file.
const addContact = async (body) => {
  // Get the existing contacts by calling the 'getAllContacts' function.
  const contacts = await getAllContacts();

  // Create a new contact object by spreading the 'body' object and adding a unique 'id' property using 'v4' from the 'uuid' module.
  const newContact = { ...body, id: v4() };

  // Add the new contact to the 'contacts' array.
  contacts.push(newContact);

  // Write the updated contacts array back to the 'contacts.json' file using 'fs.writeFile'.
  await fs.writeFile(filePath, JSON.stringify(contacts));

  // Return the newly added contact object to the caller.
  return newContact;
};

const updateContact = async (contactId, body) => {
  const contacts = await getAllContacts();
  const userIndex = contacts.findIndex((item) => item.id === contactId.toString());
  if (userIndex === -1) {
    return null;
  }
if (!body) {
    return null;
  }

contacts[userIndex] = { id: contactId, ...body };
await fs.writeFile(filePath, JSON.stringify(contacts));
  return contacts[userIndex];
};


// Export all the functions to be used in 'routes/api/contacts.js'.
module.exports = {
  getAllContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
