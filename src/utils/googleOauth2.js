import { OAuth2Client } from 'google-auth-library';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { getEnvVar } from './getEnvVar.js';
import { GOOGLE_AUTH } from '../constants/constants.js';
import createHttpError from 'http-errors';

const PATH_JSON = path.join(process.cwd(), 'google-oauth.json');

const oauthConfig = JSON.parse(await readFile(PATH_JSON));

const googleOAuthClient = new OAuth2Client({
  projectId: oauthConfig.web.project_id,
  clientId: getEnvVar(GOOGLE_AUTH.CLIENT_ID),
  clientSecret: getEnvVar(GOOGLE_AUTH.CLIENT_SECRET),
  redirectUri: oauthConfig.web.redirect_uris[0],
});

export const generateOAuthUrl = () =>
  googleOAuthClient.generateAuthUrl({
    scope: [
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/userinfo.profile',
    ],
    access_type: 'offline',
    prompt: 'consent',
  });

export const validateCode = async (code) => {
  const res = await googleOAuthClient.getToken(code);
  if (!res.tokens.id_token) throw createHttpError(401, 'Unauthorized');

  const ticket = await googleOAuthClient.verifyIdToken({
    idToken: res.tokens.id_token,
  });

  return ticket;
};

export const getNameFromPayload = (payload) => {
  let fullName = 'Guest';

  if (payload.given_name && payload.family_name) {
    fullName = `${payload.given_name} ${payload.family_name}`;
  } else if (payload.given_name) {
    fullName = payload.given_name;
  }

  return fullName;
};
