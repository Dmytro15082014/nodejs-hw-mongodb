import Joi from 'joi';

export const resetEmailValidationSchema = Joi.object({
  email: Joi.string()
    .pattern(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)
    .required()
    .email()
    .messages({ 'string.email': 'Enter email in the format name@domain.com' }),
});
