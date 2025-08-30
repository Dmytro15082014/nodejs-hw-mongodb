import { SORT_ORDER } from '../constants/constants.js';
import { ContactsCollection } from '../db/models/contactsSchema.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

export const getAllContacts = async ({
  page = 1,
  perPage = 10,
  sortBy = '_id',
  sortOrder = SORT_ORDER.ASC,
  filter = {},
}) => {
  const skip = (page - 1) * perPage;
  const limit = perPage;

  const contactsQuery = ContactsCollection.find();

  if (filter.contactType) {
    contactsQuery.where('contactType').equals(filter.contactType);
  }

  if (filter.isFavourite) {
    contactsQuery.where('isFavourite').equals(filter.isFavourite);
  }

  const [contactsCount, contacts] = await Promise.all([
    ContactsCollection.find().merge(contactsQuery).countDocuments(),

    contactsQuery
      .skip(skip)
      .limit(limit)
      .sort({ [sortBy]: sortOrder })
      .exec(),
  ]);

  const paginationData = calculatePaginationData(contactsCount, page, perPage);

  return { data: contacts, ...paginationData };
};

export const getContactsById = async (contactID) => {
  const contact = await ContactsCollection.findById(contactID);
  return contact;
};

export const createContact = async (payload) => {
  const contact = await ContactsCollection.create(payload);
  return contact;
};

export const updateContactById = async (contactID, payload, options = {}) => {
  const contact = await ContactsCollection.findByIdAndUpdate(
    { _id: contactID },
    payload,
    {
      new: true,
      includeResultMetadata: true,
      ...options,
    },
  );
  return contact;
};

export const deleteContactById = async (contactID) => {
  await ContactsCollection.findByIdAndDelete(contactID);
};
