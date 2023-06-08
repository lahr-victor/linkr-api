import joi from 'joi';

const create = joi.object({
  text: joi
    .string()
    .trim()
    .min(1)
    .max(280)
    .required(),
});

const commentSchema = { create };

export default commentSchema;
