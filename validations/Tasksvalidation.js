const Joi = require("joi");

const validator = (schema) => (payload) => {
  const { error, value } = schema.validate(payload, { abortEarly: false });
  if (!error) return { value };
  const errors = error.details.map((err) => err.message);
  return { errors };
};

const taskSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  status: Joi.string().valid("Pending", "In Progress", "Completed").required(),
  dueDate: Joi.date().required(),

  // 👇 Add username to validation
  username: Joi.string().required().messages({
    'string.empty': 'Username is required.'
  })
});

const validateTasks = (data) => validator(taskSchema)(data);

module.exports = { validateTasks };
