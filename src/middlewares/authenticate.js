import createHttpError from 'http-errors';
import { SessionsCollection } from '../db/models/sessionSchema.js';
import { UsersCollection } from '../db/models/userSchema.js';

export const authenticate = async (req, res, next) => {
  const authHeader = req.get('Authorization');

  if (!authHeader) {
    next(createHttpError(401, 'Please provide authorization headers.'));
    return;
  }

  const [bearer, accessToken] = authHeader.split(' ');

  if (bearer !== 'Bearer' || !accessToken) {
    next(createHttpError(401, 'Authorization header types must be a bearer.'));
    return;
  }

  const session = await SessionsCollection.findOne({ accessToken });

  if (session.accessTokenValidUntil < new Date()) {
    next(createHttpError(401, 'Access token expired.'));
    return;
  }

  const user = await UsersCollection.findById(session.userId);

  if (!user) {
    await SessionsCollection.findByIdAndDelete(session._id);
    next(createHttpError(401, 'User not found.'));
    return;
  }

  req.user = user;
  next();
};
