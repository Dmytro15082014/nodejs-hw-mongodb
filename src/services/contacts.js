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

  if (filter.userId) {
    contactsQuery.where('userId').equals(filter.userId);
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

export const getContact = async (contactID, userId) => {
  const contact = await ContactsCollection.findOne({ _id: contactID, userId });
  return contact;
};

export const createContact = async (payload) => {
  const contact = await ContactsCollection.create(payload);
  return contact;
};

export const updateContact = async (
  contactID,
  userId,
  payload,
  options = {},
) => {
  const contact = await ContactsCollection.findOneAndUpdate(
    { _id: contactID, userId },
    payload,
    {
      new: true,
      includeResultMetadata: true,
      ...options,
    },
  );
  return contact;
};

export const deleteContact = async (contactID, userId) => {
  await ContactsCollection.findOneAndDelete({ _id: contactID, userId });
};
