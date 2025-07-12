const Joi = require("joi");

const taskSchema = Joi.object({
  title: Joi.string().required().messages({
    'string.empty': 'Title is required.',
  }),

  description: Joi.string().required().messages({
    'string.empty': 'Description is required.',
  }),

  status: Joi.string()
    .valid("Pending", "In Progress", "Completed")
    .optional()
    .messages({
      'any.only': 'Status must be Pending, In Progress, or Completed.',
    }),

  dueDate: Joi.date().optional().messages({
    'date.base': 'Due Date must be a valid date.',
  }),

  createdAt: Joi.date().optional().messages({
    'date.base': 'CreatedAt must be a valid date.',
  }),

  owner: Joi.string().optional(), // set from token

  shareWith: Joi.array().items(Joi.string()).optional().messages({
    'array.base': 'ShareWith must be an array of usernames.',
    'string.base': 'Each item in ShareWith must be a string.',
  }),

  teamIds: Joi.array()
    .items(Joi.string().pattern(/^[0-9a-fA-F]{24}$/))
    .optional()
    .messages({
      'array.base': 'Team IDs must be an array of MongoDB ObjectIds.',
      'string.pattern.base': 'Each team ID must be a valid MongoDB ObjectId.',
    }),
});

const validateTasks = () => taskSchema;

module.exports = { validateTasks };
