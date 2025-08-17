import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  createContactController,
  deleteContactByIDController,
  getAllContactsController,
  getContactsByIdController,
  updateContactByIdController,
} from '../controllers/contacts.js';

const router = Router();

router.get('/contacts', ctrlWrapper(getAllContactsController));

router.get('/contacts/:contactID', ctrlWrapper(getContactsByIdController));

router.post('/contacts', ctrlWrapper(createContactController));

router.patch('/contacts/:contactID', ctrlWrapper(updateContactByIdController));

router.delete('/contacts/:contactID', ctrlWrapper(deleteContactByIDController));

export default router;
