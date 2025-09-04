const express = require('express');
const { validateCreateGoal, validateUpdateGoal } = require('../validation/healthGoalSchemas');
const createHttpError = require('../utils/createHttpError');

// In-memory store for simplicity
const goals = new Map();
let autoIncrementId = 1;

const router = express.Router();

/**
 * POST /
 * Create a new health goal
 */
router.post('/', (req, res, next) => {
	const { error, value } = validateCreateGoal(req.body);
	if (error) {
		return next(createHttpError(400, 'Validation failed', error.details));
	}

	const id = String(autoIncrementId++);
	const newGoal = { id, ...value, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
	goals.set(id, newGoal);
	res.status(201).json(newGoal);
});

/**
 * GET /
 * Get all goals
 */
router.get('/', (req, res) => {
	res.json(Array.from(goals.values()));
});

/**
 * PUT /:id
 * Update a goal
 */
router.put('/:id', (req, res, next) => {
	const goal = goals.get(req.params.id);
	if (!goal) {
		return next(createHttpError(404, 'Resource not found'));
	}

	const { error, value } = validateUpdateGoal(req.body);
	if (error) {
		return next(createHttpError(400, 'Validation failed', error.details));
	}

	const updated = { ...goal, ...value, updatedAt: new Date().toISOString() };
	goals.set(goal.id, updated);
	res.json(updated);
});

/**
 * DELETE /:id
 * Delete a goal
 */
router.delete('/:id', (req, res, next) => {
	const goal = goals.get(req.params.id);
	if (!goal) {
		return next(createHttpError(404, 'Resource not found'));
	}
	goals.delete(goal.id);
	res.status(204).send();
});

module.exports = router;


