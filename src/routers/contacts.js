import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  createContactController,
  deleteContactController,
  getAllContactsController,
  getContactController,
  updateContactController,
} from '../controllers/contacts.js';
import { validateBody } from '../middlewares/validateBody.js';
import { contactsValidationSchema } from '../validation/contactsValidationSchema.js';
import { isValidId } from '../middlewares/isValidId.js';
import { authenticate } from '../middlewares/authenticate.js';
import { patchValidationSchema } from '../validation/patchValidationSchema.js';


const contactsRouter = Router();

contactsRouter.use('/contacts', authenticate);

contactsRouter.get('/contacts', ctrlWrapper(getAllContactsController));

contactsRouter.get(
  '/contacts/:contactID',
  isValidId,
  ctrlWrapper(getContactController),
);

contactsRouter.post(
  '/contacts',
  validateBody(contactsValidationSchema),
  ctrlWrapper(createContactController),
);

contactsRouter.patch(
  '/contacts/:contactID',
  isValidId,
  validateBody(patchValidationSchema),
  ctrlWrapper(updateContactController),
);

contactsRouter.delete(
  '/contacts/:contactID',
  isValidId,
  ctrlWrapper(deleteContactController),
);

export default contactsRouter;
