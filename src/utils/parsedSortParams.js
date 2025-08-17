import { SORT_ORDER } from '../constants/constants.js';

export const parsedSortParams = (query) => {
  const parseSortBy = parsedSortBy(query.sortBy);
  const parseSortOrder = parsedSortOrder(query.sortOrder);
  return {
    sortBy: parseSortBy,
    sortOrder: parseSortOrder,
  };
};

function parsedSortBy(key) {
  const keyOfItem = [
    '_id',
    'name',
    'phoneNumber',
    'email',
    'isFavourite',
    'contactType',
    'createdAt',
    'updatedAt',
  ];
  if (keyOfItem.includes(key)) return key;
  return '_id';
}

function parsedSortOrder(order) {
  const { ASC, DESC } = SORT_ORDER;
  if (DESC === order) {
    return order;
  } else {
    return ASC;
  }
}
