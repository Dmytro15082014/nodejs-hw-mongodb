import dotenv from 'dotenv';

dotenv.config();

export function getEnvVar(name, defaultVal) {
  const val = process.env[name];

  if (val) return val;
  if (defaultVal) return defaultVal;

  throw new Error(`Missing: process.env['${name}']`);
}
