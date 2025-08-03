import { ContactsCollection } from '../db/models/contactsSchema.js';

export const getAllContacts = async () => {
  const contacts = await ContactsCollection.find();
  return contacts;
};

export const getContactsById = async (contactID) => {
  const contact = await ContactsCollection.findById(contactID);
  return contact;
};
