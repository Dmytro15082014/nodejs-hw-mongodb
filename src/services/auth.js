import createHttpError from 'http-errors';
import crypto from 'node:crypto';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UsersCollection } from '../db/models/userSchema.js';
import { SessionsCollection } from '../db/models/sessionSchema.js';
import { SMTP, TEMPLATES_DIR, TOKEN } from '../constants/constants.js';
import { getEnvVar } from '../utils/getEnvVar.js';
import { sendMail } from '../utils/sendMail.js';
import path from 'node:path';
import fs from 'node:fs';
import handlebars from 'handlebars';

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

export const sendResetEmail = async (email) => {
  const user = await UsersCollection.findOne({ email });
  if (!user) {
    throw createHttpError(404, 'User not found!');
  }

  const resetToken = jwt.sign(
    {
      sub: user._id,
      email,
      iat: Number(Date.now),
    },
    getEnvVar('JWT_SECRET'),
    {
      expiresIn: '5m',
    },
  );

  const resetLink = `${getEnvVar(
    SMTP.APP_DOMAIN,
  )}/reset-password?token=${resetToken}`;

  const resetEmailTemplate = path.join(
    TEMPLATES_DIR,
    'sendResetEmailTemplate.html',
  );
  const source = fs.readFileSync(resetEmailTemplate).toString();
  const template = handlebars.compile(source);
  const html = template({
    name: user.name,
    expirationTime: '5m',
    resetLink,
  });

  await sendMail({
    from: getEnvVar(SMTP.SMTP_FROM),
    to: email,
    subject: 'Reset your password',
    html,
  });
};
