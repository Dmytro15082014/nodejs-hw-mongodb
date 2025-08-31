import Joi from 'joi';

export const resetPasswordValidationSchema = Joi.object({
  token: Joi.string().min(10).required(),
  password: Joi.string().min(6).required().messages({
    'string.password': 'The password must be at least 6 characters long. ',
  }),
});
