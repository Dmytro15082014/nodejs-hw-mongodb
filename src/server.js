import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import { getEnvVar } from './utils/getEnvVar.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import router from './routers/index.js';
import cookieParser from 'cookie-parser';
import { UPLOAD_DIR } from './constants/constants.js';
import { swaggerDocs } from './middlewares/swaggerDocs.js';

const PORT = Number(getEnvVar('PORT', '3000'));

export const setupServer = () => {
  const app = express();

  app.use(express.json());
  app.use(cors());

  app.use(
    pino({
      transport: { target: 'pino-pretty' },
    }),
  );
  app.use(cookieParser());

  app.use('/uploads', express.static(UPLOAD_DIR));
  app.use('/api-docs', swaggerDocs());
  app.get('/contacts', router);
  app.get('/contacts/:contactID', router);
  app.post('/contacts', router);
  app.patch('/contacts/:contactID', router);
  app.delete('/contacts/:contactID', router);

  app.post('/auth/register', router);
  app.post('/auth/login', router);
  app.post('/auth/refresh', router);
  app.post('/auth/logout', router);
  app.post('/auth/send-reset-email', router);
  app.post('/auth/reset-pwd', router);
  app.post('/auth/get-oauth-url', router);
  app.post('/auth/confirm-google-auth', router);

  app.use(notFoundHandler);

  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
