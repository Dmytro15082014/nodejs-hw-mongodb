import path from 'node:path';

export const CONTACT_TYPE = ['work', 'home', 'personal'];

export const SORT_ORDER = {
  ASC: 'asc',
  DESC: 'desc',
};

export const TOKEN = { ACC: 1000 * 60 * 15, REF: 1000 * 60 * 60 * 24 * 30 };

export const SMTP = {
  SMTP_HOST: 'SMTP_HOST',
  SMTP_PORT: 'SMTP_PORT',
  SMTP_USER: 'SMTP_USER',
  SMTP_PASSWORD: 'SMTP_PASSWORD',
  SMTP_FROM: 'SMTP_FROM',
  APP_DOMAIN: 'APP_DOMAIN',
};

export const TEMPLATES_DIR = path.join(process.cwd(), 'templates');

export const TEMP_UPLOAD_DIR = path.join(process.cwd(), 'temp');

export const UPLOAD_DIR = path.join(process.cwd(), 'uploads');

export const CLOUDINARY = {
  CLOUD_NAME: 'CLOUD_NAME',
  CLOUD_API_KEY: 'CLOUD_API_KEY',
  CLOUD_API_SECRET: 'CLOUD_API_SECRET',
};

export const GOOGLE_AUTH = {
  CLIENT_ID: 'GOOGLE_AUTH_CLIENT_ID',
  CLIENT_SECRET: 'GOOGLE_AUTH_CLIENT_SECRET',
};

export const SWAGGER_PATH = path.join(process.cwd(), 'docs', 'swagger.json');
