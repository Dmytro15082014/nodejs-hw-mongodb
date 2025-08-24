import { Router } from 'express';
import {
  loginUserController,
  registerUserController,
} from '../controllers/auth.js';
import { validateBody } from '../middlewares/validateBody.js';
import { registerValidationSchema } from '../validation/registerValidationSchema.js';
import { loginValidationSchema } from '../validation/loginValidationSchema.js';

const authRouter = Router();

authRouter.post(
  '/auth/register',
  validateBody(registerValidationSchema),
  registerUserController,
);

authRouter.post(
  '/auth/login',
  validateBody(loginValidationSchema),
  loginUserController,
);

export default authRouter;
