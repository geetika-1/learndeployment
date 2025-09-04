const swaggerJsdoc = require('swagger-jsdoc');

const options = {
	definition: {
		openapi: '3.0.3',
		info: {
			title: 'Health Goals API',
			version: '1.0.0',
			description: 'CRUD API for managing health goals (MACH-aligned)'
		},
		servers: [
			{ url: 'http://localhost:3000', description: 'Local' }
		],
	},
	apis: [],
};

const swaggerSpec = swaggerJsdoc(options);

// Manually add paths to keep it simple without annotating routes
swaggerSpec.paths = {
	'/health': {
		get: {
			summary: 'Healthcheck',
			responses: { '200': { description: 'OK' } }
		}
	},
	'/api/health-goals': {
		post: {
			summary: 'Create health goal',
			requestBody: {
				required: true,
				content: {
					'application/json': {
						schema: { $ref: '#/components/schemas/HealthGoalCreate' }
					}
				}
			},
			responses: { '201': { description: 'Created' }, '400': { description: 'Bad Request' } }
		},
		get: {
			summary: 'List all health goals',
			responses: { '200': { description: 'OK' } }
		}
	},
	'/api/health-goals/{id}': {
		put: {
			summary: 'Update health goal',
			parameters: [
				{ in: 'path', name: 'id', required: true, schema: { type: 'string' } }
			],
			requestBody: {
				required: true,
				content: {
					'application/json': {
						schema: { $ref: '#/components/schemas/HealthGoalUpdate' }
					}
				}
			},
			responses: { '200': { description: 'OK' }, '400': { description: 'Bad Request' }, '404': { description: 'Not Found' } }
		},
		delete: {
			summary: 'Delete health goal',
			parameters: [
				{ in: 'path', name: 'id', required: true, schema: { type: 'string' } }
			],
			responses: { '204': { description: 'No Content' }, '404': { description: 'Not Found' } }
		}
	}
};

swaggerSpec.components = swaggerSpec.components || {};
swaggerSpec.components.schemas = {
	HealthGoalCreate: {
		type: 'object',
		required: ['name', 'target', 'unit'],
		properties: {
			name: { type: 'string' },
			description: { type: 'string', nullable: true },
			target: { type: 'number' },
			unit: { type: 'string', enum: ['steps', 'km', 'minutes', 'calories'] },
			deadline: { type: 'string', format: 'date-time' }
		}
	},
	HealthGoalUpdate: {
		type: 'object',
		properties: {
			name: { type: 'string' },
			description: { type: 'string', nullable: true },
			target: { type: 'number' },
			unit: { type: 'string', enum: ['steps', 'km', 'minutes', 'calories'] },
			deadline: { type: 'string', format: 'date-time' }
		}
	}
};

module.exports = swaggerSpec;


