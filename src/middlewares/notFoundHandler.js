export const notFoundHandler = (err, req, res, next) => {
  res.status(404).json({
    status: 404,
    message: 'Route not found',
  });
};
