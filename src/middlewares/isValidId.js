import createHttpError from 'http-errors';
import { isValidObjectId } from 'mongoose';

export const isValidId = (req, res, next) => {
  const { contactID } = req.params;
  if (!isValidObjectId(contactID)) {
    throw createHttpError(404, 'Bad Request');
  }
  next();
};
