import joi from 'joi';

const customMessages = {
  'string.base': '{#label} deve ser uma string',
  'string.empty': '{#label} não pode estar vazio',
  'string.email': '{#label} deve ser um email válido',
  'string.min': '{#label} deve ter no mínimo {#limit} caracteres',
  'any.required': '{#label} é um campo obrigatório',
  'any.only': '{#label} deve ser igual a {#valids}',
};

export const userSchema = joi.object({
  name: joi.string().required().messages(customMessages),
  email: joi.string().email().required().messages(customMessages),
  photo: joi.string().required().messages(customMessages),
  password: joi.string().required().min(3).messages(customMessages),
  confirmPassword: joi.string()
    .valid(joi.ref('password'))
    .required()
    .messages(customMessages),
});

export const logInSchema = joi.object({
  email: joi.string().email().required().messages(customMessages),
  password: joi.string().required().messages(customMessages),
});
