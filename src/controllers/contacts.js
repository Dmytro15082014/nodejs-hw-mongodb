import {
  createContact,
  deleteContactById,
  getAllContacts,
  getContactsById,
  updateContactById,
} from '../services/contacts.js';
import createHttpError from 'http-errors';
import { parsedPaginationNumbers } from '../utils/parsedPaginationNumbers.js';
import { parsedSortParams } from '../utils/parsedSortParams.js';
import { parsedFiltersParams } from '../utils/parsedFiltersParams.js';

export const getAllContactsController = async (req, res) => {
  const { page, perPage } = parsedPaginationNumbers(req.query);
  const { sortBy, sortOrder } = parsedSortParams(req.query);
  const filter = parsedFiltersParams(req.query);
  const contacts = await getAllContacts({
    page,
    perPage,
    sortBy,
    sortOrder,
    filter,
  });

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

  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact',
    data: contact,
  });
};

export const updateContactByIdController = async (req, res, next) => {
  const { contactID } = req.params;
  const contact = await updateContactById(contactID, req.body);

  if (!contact.value) {
    throw next(createHttpError(404, 'Contact not found'));
  }

  res.status(200).json({
    status: 200,
    message: 'Successfully patched a contact!',
    data: contact.value,
  });
};

export const deleteContactByIDController = async (req, res, next) => {
  const { contactID } = req.params;
  const contact = await getContactsById(contactID);

  if (!contact) {
    throw next(createHttpError(404, 'Contact not found'));
  }

  await deleteContactById(contactID);

  res.status(204).send();
};
