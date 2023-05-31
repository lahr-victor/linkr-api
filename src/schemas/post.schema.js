import Joi from 'joi';

const create = Joi.object({
  url: Joi.string().trim().uri().required(),
  description: Joi.string().trim().optional(),
});

const postSchema = { create };

export default postSchema;
