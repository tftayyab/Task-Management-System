// ✅ FIXED VERSION
const Joi = require("joi");

const taskSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  status: Joi.string().valid("Pending", "In Progress", "Completed").required(),
  dueDate: Joi.date().required(),
  username: Joi.string().required().messages({
    'string.empty': 'Username is required.'
  })
});

const validateTasks = () => taskSchema; // ✅ just return schema functionally

module.exports = { validateTasks };
