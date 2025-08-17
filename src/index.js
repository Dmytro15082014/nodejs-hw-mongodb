import { setupServer } from './server.js';
import { initMongoConnection } from './db/initMongoConnection.js';

const bootStrap = async () => {
  await initMongoConnection();
  setupServer();
};

bootStrap();
