import createHttpError from 'http-errors';
import { CONTACT_TYPE } from '../constants/constants.js';

export const parsedFiltersParams = (query) => {
  const { contactType, isFavourite } = query;

  const parsedType = parseContactType(contactType);
  const parsedFavorite = parseFavoriteContact(isFavourite);

  return {
    contactType: parsedType,
    isFavourite: parsedFavorite,
  };
};

function parseContactType(type) {
  if (type === undefined) return;

  if (CONTACT_TYPE.includes(type)) return type;

  throw createHttpError(404, 'Bad Request', {
    error:
      'The type must correspond to one of this types: work, home, personal',
  });
}

function parseFavoriteContact(bool) {
  if (bool === undefined) return;
  const boolean = ['true', 'false'];

  if (boolean.includes(bool)) return bool;

  throw createHttpError(404, 'Bad Request', {
    error: "The value of this field must be 'true' or 'false'",
  });
}
