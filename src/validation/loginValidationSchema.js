import Joi from 'joi';

export const loginValidationSchema = Joi.object({
  email: Joi.string()
    .pattern(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)
    .required()
    .email()
    .messages({ 'string.email': 'Enter email in the format name@domain.com' }),
  password: Joi.string().min(6).required().messages({
    'string.password': 'The password must be at least 6 characters long. ',
  }),
});
