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

function validateQuery(schema) {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.query, {
      abortEarly: false,
    });
    if (error && error.details.length) {
      return res
        .status(400)
        .send(error.details.map((detail) => detail.message));
    }
    req.query = value;
    return next();
  };
}

const schemaMiddleware = { validateSchema, validateQuery };

export default schemaMiddleware;
