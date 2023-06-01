import joi from 'joi';
import customMessages from './customMessages.js';

const signUp = joi.object({
  email: joi.string().email().required().messages(customMessages),
  password: joi.string().required().min(3).messages(customMessages),
  name: joi.string().required().messages(customMessages),
  photo: joi
    .string()
    .uri({ scheme: ['http', 'https'] })
    .required()
    .messages(customMessages),
});

const logIn = joi.object({
  email: joi.string().email().required().messages(customMessages),
  password: joi.string().required().messages(customMessages),
});

const userSchemas = {
  signUp,
  logIn,
};

export default userSchemas;
