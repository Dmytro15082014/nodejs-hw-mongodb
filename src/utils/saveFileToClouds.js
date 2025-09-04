import cloudinary from 'cloudinary';
import { getEnvVar } from './getEnvVar.js';
import { CLOUDINARY } from '../constants/constants.js';
import fs from 'node:fs/promises';

cloudinary.v2.config({
  cloud_name: getEnvVar(CLOUDINARY.CLOUD_NAME),
  api_key: getEnvVar(CLOUDINARY.CLOUD_API_KEY),
  api_secret: getEnvVar(CLOUDINARY.CLOUD_API_SECRET),
  secure: true,
});

export const saveFileToClouds = async (file) => {
  const res = await cloudinary.v2.uploader.upload(file.path);
  await fs.unlink(file.path);

  return res.secure_url;
};
