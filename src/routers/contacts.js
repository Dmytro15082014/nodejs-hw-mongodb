import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  createContactController,
  deleteContactByIDController,
  getAllContactsController,
  getContactsByIdController,
  updateContactByIdController,
} from '../controllers/contacts.js';
import { validateBody } from '../middlewares/validateBody.js';
import { contactsValidationSchema } from '../validation/contactsValidationSchema.js';
import { isValidId } from '../middlewares/isValidId.js';

const router = Router();

router.get('/contacts', ctrlWrapper(getAllContactsController));

router.get(
  '/contacts/:contactID',
  isValidId,
  ctrlWrapper(getContactsByIdController),
);

router.post(
  '/contacts',
  validateBody(contactsValidationSchema),
  ctrlWrapper(createContactController),
);

router.patch(
  '/contacts/:contactID',
  isValidId,
  validateBody(contactsValidationSchema),
  ctrlWrapper(updateContactByIdController),
);

router.delete(
  '/contacts/:contactID',
  isValidId,
  ctrlWrapper(deleteContactByIDController),
);

export default router;
