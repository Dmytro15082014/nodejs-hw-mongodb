import { registerUser } from '../services/auth.js';

export const registerUserController = async (req, res) => {
  const user = await registerUser();

  res.json({
    status: 200,
    message: 'Successfully register a user!',
    data: user,
  });
};
