// middleware/validateRequest.js
module.exports = (schemaFn) => (req, res, next) => {
  const schema = schemaFn(); // Call schema function
  const { error, value } = schema.validate(req.body, { abortEarly: false });

  if (error) {
    const errors = error.details.map(err => err.message);
    console.log("❌ Joi validation failed:", errors);
    return res.status(400).json({ errors });
  }

  req.validatedBody = value; // Validated data
  next();
};
