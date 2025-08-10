import { isHttpError } from 'http-errors';

export const notFoundHandler = (err, req, res, next) => {
  if (isHttpError(err)) {
    res.status(err.status).json({
      status: err.status,
      message: err.message,
      data: err.data,
    });
  }
  next(err);
};
