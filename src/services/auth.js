import createHttpError from 'http-errors';
import bcrypt from 'bcrypt';
import { UsersCollection } from '../db/models/userSchema.js';

export const registerUser = async (payload) => {
  const userCheck = await UsersCollection.findOne({ email: payload.email });
  if (userCheck) {
    throw createHttpError(409, 'Email in use');
  }

  const hashPass = await bcrypt.hashSync(payload.password, 10);

  const user = await UsersCollection.create({ ...payload, password: hashPass });

  return user;
};
