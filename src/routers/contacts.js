import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper';
import {
  getAllContactsController,
  getContactsByIdController,
} from '../controllers/contacts';

const router = Router();

router.get('/contacts', ctrlWrapper(getAllContactsController));

router.get('/contacts/:contactID', ctrlWrapper(getContactsByIdController));

export default router;
