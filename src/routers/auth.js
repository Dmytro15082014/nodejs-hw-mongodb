import { Router } from 'express';
import {
  loginUserController,
  logoutUserController,
  refreshSessionController,
  registerUserController,
  sendResetEmailController,
} from '../controllers/auth.js';
import { validateBody } from '../middlewares/validateBody.js';
import { registerValidationSchema } from '../validation/registerValidationSchema.js';
import { loginValidationSchema } from '../validation/loginValidationSchema.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { resetEmailValidationSchema } from '../validation/resetEmailValidationSchema.js';

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

authRouter.post('/auth/refresh', ctrlWrapper(refreshSessionController));

authRouter.post('/auth/logout', ctrlWrapper(logoutUserController));

authRouter.post(
  '/auth/send-reset-email',
  validateBody(resetEmailValidationSchema),
  ctrlWrapper(sendResetEmailController),
);

export default authRouter;
