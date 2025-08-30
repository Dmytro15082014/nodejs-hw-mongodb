export const parsedPaginationNumbers = (query) => {
  const { page, perPage } = query;
  const parsedPage = parsedNumber(page, 1);
  const parsedPerPage = parsedNumber(perPage, 10);

  return {
    page: parsedPage,
    perPage: parsedPerPage,
  };
};

function parsedNumber(number, defaultValue) {
  if (typeof number === 'number') return number;

  const parsedNumber = parseInt(number);
  if (Number.isNaN(parsedNumber)) return defaultValue;
  return parsedNumber;
}
