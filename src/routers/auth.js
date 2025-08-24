import { Router } from 'express';
import { registerUserController } from '../controllers/auth.js';
import { validateBody } from '../middlewares/validateBody.js';
import { registerValidationSchema } from '../validation/registerValidationSchema.js';

const authRouter = Router();

authRouter.post(
  '/auth/register',
  validateBody(registerValidationSchema),
  registerUserController,
);

export default authRouter;
