const Joi = require('joi');

const createSchema = Joi.object({
	name: Joi.string().min(3).max(100).required(),
	description: Joi.string().max(500).allow('', null),
	target: Joi.number().positive().required(),
	unit: Joi.string().valid('steps', 'km', 'minutes', 'calories').required(),
	deadline: Joi.date().iso().optional(),
});

const updateSchema = Joi.object({
	name: Joi.string().min(3).max(100),
	description: Joi.string().max(500).allow('', null),
	target: Joi.number().positive(),
	unit: Joi.string().valid('steps', 'km', 'minutes', 'calories'),
	deadline: Joi.date().iso(),
}).min(1);

function validateCreateGoal(payload) {
	return createSchema.validate(payload, { abortEarly: false, allowUnknown: false });
}

function validateUpdateGoal(payload) {
	return updateSchema.validate(payload, { abortEarly: false, allowUnknown: false });
}

module.exports = { validateCreateGoal, validateUpdateGoal };


