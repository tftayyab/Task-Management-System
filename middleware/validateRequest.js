// Middleware for schema validation using Joi
module.exports = (schemaFn) => (req, res, next) => { // This exports a function that returns a middleware function.
  const { error, value } = schemaFn(req.body);
  if (error) {
    return res.status(400).json({ message: error });
  }
  req.validatedBody = value;
  next();
};
