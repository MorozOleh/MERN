const Joi = require('joi');

const validateRegistration = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(3),
    email: Joi.string().email(),
    last_name: Joi.string().min(3),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]')).min(8, 'utf-8'),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).json({ message: error.message });
  }

  next();
};

module.exports = { validateRegistration };
