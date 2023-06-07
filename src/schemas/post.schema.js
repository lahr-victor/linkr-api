import Joi from 'joi';
import customMessages from './customMessages.js';

const create = Joi.object({
  url: Joi
    .string()
    .trim()
    .uri()
    .required()
    .messages(customMessages),
  description: Joi
    .string()
    .trim()
    .min(0)
    .optional()
    .messages(customMessages),
});

const query = Joi.object({
  limit: Joi.number().integer().optional(),
  offset: Joi.number().integer().optional(),
});

const postSchema = { create, query };

export default postSchema;
