import Joi from 'joi';
import { CONTACT_TYPE } from '../constants/constants.js';
import { isValidObjectId } from 'mongoose';

export const contactsValidationSchema = Joi.object({
  name: Joi.string().min(3).max(20).required(),
  phoneNumber: Joi.string()
    .pattern(/^\+[0-9]{10,15}$/)
    .required()
    .messages({
      'string.pattern.base': 'Phone number must be in format +380XX XXX XX XX',
    }),
  email: Joi.string()
    .email()
    .messages({ 'string.email': 'Enter email in the format name@domain.com' }),
  isFavourite: Joi.boolean()
    .falsy('false')
    .truthy('true')
    .messages({ 'boolean.base': 'This field must be true or false.' }),
  contactType: Joi.string()
    .valid(...CONTACT_TYPE)
    .required()
    .messages({ 'any.only': 'Type must be one of: work, home, personal' }),
  userId: Joi.string().custom((value, helper) => {
    if (value && !isValidObjectId(value)) {
      return helper.message('Not valid user ID');
    }
    return true;
  }),
  photo: Joi.string(),
});
