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
import { authenticate } from '../middlewares/authenticate.js';

const contactsRouter = Router();

contactsRouter.use('/contacts', authenticate);

contactsRouter.get('/contacts', ctrlWrapper(getAllContactsController));

contactsRouter.get(
  '/contacts/:contactID',
  isValidId,
  ctrlWrapper(getContactsByIdController),
);

contactsRouter.post(
  '/contacts',
  validateBody(contactsValidationSchema),
  ctrlWrapper(createContactController),
);

contactsRouter.patch(
  '/contacts/:contactID',
  isValidId,
  validateBody(contactsValidationSchema),
  ctrlWrapper(updateContactByIdController),
);

contactsRouter.delete(
  '/contacts/:contactID',
  isValidId,
  ctrlWrapper(deleteContactByIDController),
);

export default contactsRouter;
