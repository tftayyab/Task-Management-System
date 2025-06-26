const Joi = require("joi");

// Joi Schema
const userSchema = Joi.object({
  firstName: Joi.string().required().messages({
    'string.empty': 'First name is required.'
  }),
  lastName: Joi.string().required().messages({
    'string.empty': 'Last name is required.'
  }),
  username: Joi.string().alphanum().min(3).max(30).required().messages({
    'string.empty': 'Username is required.',
    'string.alphanum': 'Username must contain only letters and numbers.',
    'string.min': 'Username must be at least 3 characters.',
    'string.max': 'Username must not exceed 30 characters.'
  }),
  email: Joi.string().email().required().messages({
    'string.email': 'Email must be a valid email address.',
    'string.empty': 'Email is required.'
  }),
  password: Joi.string().min(6).required().messages({
    'string.empty': 'Password is required.',
    'string.min': 'Password must be at least 6 characters long.'
  })
});


const validateUsers = () => userSchema;

module.exports = { validateUsers };
