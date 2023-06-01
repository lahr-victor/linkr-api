import joi from 'joi';

const searchName = joi.object({
  name: joi.string().trim().required(),
});

const searchSchema = { searchName };

export default searchSchema;
