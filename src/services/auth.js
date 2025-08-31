import createHttpError from 'http-errors';
import crypto from 'node:crypto';
import bcrypt from 'bcrypt';
import { UsersCollection } from '../db/models/userSchema.js';
import { SessionsCollection } from '../db/models/sessionSchema.js';
import { TOKEN } from '../constants/constants.js';

export const registerUser = async (payload) => {
  const userCheck = await UsersCollection.findOne({ email: payload.email });
  if (userCheck) {
    throw createHttpError(409, 'Email in use');
  }

  const hashPass = await bcrypt.hashSync(payload.password, 10);

  const user = await UsersCollection.create({ ...payload, password: hashPass });

  return user;
};

export const loginUser = async ({ email, password }) => {
  const userCheck = await UsersCollection.findOne({ email });
  if (!userCheck) {
    throw createHttpError(
      401,
      'User with given credentials does not exist, please register!',
    );
  }

  const arePassEqual = await bcrypt.compareSync(password, userCheck.password);
  if (!arePassEqual) {
    throw createHttpError(401, 'Invalid password, please check input data!');
  }

  await SessionsCollection.findByIdAndDelete(userCheck._id);

  const session = await SessionsCollection.create({
    accessToken: crypto.randomBytes(30).toString('base64'),
    refreshToken: crypto.randomBytes(30).toString('base64'),
    accessTokenValidUntil: new Date(Date.now() + TOKEN.ACC),
    refreshTokenValidUntil: new Date(Date.now() + TOKEN.REF),
    userId: userCheck._id,
  });

  return session;
};

export const refreshSession = async (sessionId) => {
  const session = await SessionsCollection.findById(sessionId);
  if (!session) {
    throw createHttpError(401, 'Session not found!');
  }

  if (session.refreshTokenValidUntil < new Date()) {
    await SessionsCollection.findByIdAndDelete(sessionId);
    throw createHttpError(401, 'Session not found!');
  }

  const user = await UsersCollection.findById(session.userId);
  if (!user) {
    await SessionsCollection.findByIdAndDelete(sessionId);
    throw createHttpError(401, 'Session not found!');
  }

  await SessionsCollection.findByIdAndDelete(sessionId);

  const newSession = await SessionsCollection.create({
    accessToken: crypto.randomBytes(30).toString('base64'),
    refreshToken: crypto.randomBytes(30).toString('base64'),
    accessTokenValidUntil: new Date(Date.now() + TOKEN.ACC),
    refreshTokenValidUntil: new Date(Date.now() + TOKEN.REF),
    userId: user._id,
  });

  return newSession;
};

export const logoutUser = async (sessionId) => {
  await SessionsCollection.findByIdAndDelete(sessionId);
};
