import {
  createContact,
  getAllContacts,
  getContactsById,
  updateContactById,
} from '../services/contacts.js';
import createHttpError from 'http-errors';

export const getAllContactsController = async (req, res) => {
  const contacts = await getAllContacts();
  res.status(200).json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
};

export const getContactsByIdController = async (req, res, next) => {
  const { contactID } = req.params;
  const contact = await getContactsById(contactID);

  if (!contact) {
    throw next(createHttpError(404, 'Contact not found'));
  }

  res.status(200).json({
    status: 200,
    message: `Successfully found contact with id ${contactID}!`,
    data: contact,
  });
};

export const createContactController = async (req, res, next) => {
  const contact = await createContact(req.body);
  if (!contact) {
    throw next(createHttpError(406, 'Contact not created'));
  }

  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact',
    data: contact,
  });
};

export const updateContactByIdController = async (req, res, next) => {
  const { contactID } = req.params;
  const contact = await updateContactById(contactID, req.body);
  if (!contact) {
    throw next(createHttpError(404, 'Contact not found'));
  }

  res.status(200).json({
    status: 200,
    message: 'Successfully patched a contact!',
    data: contact.value,
  });
};
