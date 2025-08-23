import { Router } from 'express';
import { registerUserController } from '../controllers/auth.js';

const authRouter = Router();

authRouter.post('/auth/register', registerUserController);

export default authRouter;
