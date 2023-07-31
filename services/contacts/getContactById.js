const contactsOperations = require("../../models/contacts");


const getContactById = async (contactId) => {
  try {
    
    const data = await contactsOperations.getContactById(contactId);
   
    return data;
  } catch (error) {
    
    console.log(error.message);
  }
};


module.exports = getContactById;