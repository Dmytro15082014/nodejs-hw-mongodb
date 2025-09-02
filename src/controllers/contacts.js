import {
  createContact,
  deleteContact,
  getAllContacts,
  getContact,
  updateContact,
} from '../services/contacts.js';
import createHttpError from 'http-errors';
import { parsedPaginationNumbers } from '../utils/parsedPaginationNumbers.js';
import { parsedSortParams } from '../utils/parsedSortParams.js';
import { parsedFiltersParams } from '../utils/parsedFiltersParams.js';
import { saveFileToUploads } from '../utils/saveFileToUploads.js';

export const getAllContactsController = async (req, res) => {
  const { page, perPage } = parsedPaginationNumbers(req.query);
  const { sortBy, sortOrder } = parsedSortParams(req.query);
  const filter = parsedFiltersParams(req.query);
  filter.userId = req.user._id;

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

export const getContactController = async (req, res, next) => {
  const contactID = req.params.contactID;
  const contact = await getContact(contactID, req.user._id);

  if (!contact) {
    throw next(createHttpError(404, 'Contact not found'));
  }

  res.status(200).json({
    status: 200,
    message: `Successfully found contact with id ${contact._id}!`,
    data: contact,
  });
};

export const createContactController = async (req, res, next) => {
  const userId = req.body.userId ?? req.user._id;
  const photo = req.file;
  let photoUrl;
  if (photo) {
    photoUrl = await saveFileToUploads(photo);
  }

  const contact = await createContact({
    ...req.body,
    userId,
    photo: photoUrl,
  });

  if (!contact) {
    next(createHttpError(404, 'Contact not create!'));
  }

  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact',
    data: contact,
  });
};

export const updateContactController = async (req, res, next) => {
  const contactID = req.params.contactID;
  const userId = req.user._id;
  const photo = req.file;
  let photoUrl;
  if (photo) {
    photoUrl = await saveFileToUploads(photo);
  }
  const contact = await updateContact(contactID, userId, {
    ...req.body,
    photo: photoUrl,
  });

  if (!contact.value) {
    throw next(createHttpError(404, 'Contact not found'));
  }

  res.status(200).json({
    status: 200,
    message: 'Successfully patched a contact!',
    data: contact.value,
  });
};

export const deleteContactController = async (req, res, next) => {
  const contactID = req.params.contactID;
  const userId = req.user._id;
  const contact = await getContact(contactID, userId);

  if (!contact) {
    throw next(createHttpError(404, 'Contact not found'));
  }

  await deleteContact(contactID, userId);

  res.status(204).send();
};
