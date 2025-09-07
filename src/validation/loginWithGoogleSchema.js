import Joi from 'joi';

export const loginWithGoogleSchema = Joi.object({
  code: Joi.string().required(),
});
