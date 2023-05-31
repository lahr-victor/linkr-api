function validateSchema(schema) {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body, {
      abortEarly: false,
    });
    if (error && error.details.length) {
      return res
        .status(422)
        .send(error.details.map((detail) => detail.message));
    }
    req.body = value;
    return next();
  };
}

const schemaMiddleware = { validateSchema };

export default schemaMiddleware;
