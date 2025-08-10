import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  createContactController,
  getAllContactsController,
  getContactsByIdController,
} from '../controllers/contacts.js';

const router = Router();

router.get('/contacts', ctrlWrapper(getAllContactsController));

router.get('/contacts/:contactID', ctrlWrapper(getContactsByIdController));

router.post('/contacts', ctrlWrapper(createContactController));

export default router;
