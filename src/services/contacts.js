import { ContactsCollection } from '../db/models/contactsSchema.js';

export const getAllContacts = async () => {
  const contacts = await ContactsCollection.find();
  return contacts;
};

export const getContactsById = async (contactID) => {
  const contact = await ContactsCollection.findById(contactID);
  return contact;
};

export const createContact = async (payload) => {
  const contact = await ContactsCollection.create(payload);
  return contact;
};
