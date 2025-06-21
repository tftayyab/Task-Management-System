// middleware/validateRequest.js
module.exports = (validateFn) => (req, res, next) => {
  const { errors, value } = validateFn(req.body);  // ✅ Just call the function directly
  if (errors) {
    return res.status(400).json({ errors });
  }
  req.validatedBody = value; // Optional: keep if you want to use the validated data later
  next();
};
