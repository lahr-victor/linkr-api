import joi from 'joi';

const customMessages = {
  'string.base': '{#label} deve ser uma string',
  'string.empty': '{#label} não pode estar vazio',
  'string.email': '{#label} deve ser um email válido',
  'string.min': '{#label} deve ter no mínimo {#limit} caracteres',
  'any.required': '{#label} é um campo obrigatório',
  'any.only': '{#label} deve ser igual a {#valids}',
  'string.uri': '{#label} deve ser uma URL válida com o formato http:// ou https://',
};

const signUp = joi.object({
  email: joi.string().email().required().messages(customMessages),
  password: joi.string().required().min(3).messages(customMessages),
  name: joi.string().required().messages(customMessages),
  photo: joi.string()
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
