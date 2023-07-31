const contactsOperations = require("../../models/contacts");


const removeContact = async (contactId) => {
  try {
    
    const data = await contactsOperations.removeContact(contactId);
   
    return data;
  } catch (error) {
    
    console.log(error.message);
  }
};


module.exports = removeContact;



















