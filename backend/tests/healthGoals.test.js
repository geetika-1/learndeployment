const request = require('supertest');
const app = require('../src/setup/app');

describe('Health Goals API', () => {
	it('GET /health returns ok', async () => {
		const res = await request(app).get('/health');
		expect(res.status).toBe(200);
		expect(res.body).toEqual({ status: 'ok' });
	});

	it('POST /api/health-goals validates input', async () => {
		const res = await request(app).post('/api/health-goals').send({});
		expect(res.status).toBe(400);
		expect(res.body.error.message).toBe('Validation failed');
	});

	it('CRUD flow works', async () => {
		// Create
		const createRes = await request(app)
			.post('/api/health-goals')
			.send({ name: 'Daily Steps', target: 10000, unit: 'steps' });
		expect(createRes.status).toBe(201);
		const created = createRes.body;

		// List
		const listRes = await request(app).get('/api/health-goals');
		expect(listRes.status).toBe(200);
		expect(listRes.body.length).toBeGreaterThanOrEqual(1);

		// Update
		const updateRes = await request(app)
			.put(`/api/health-goals/${created.id}`)
			.send({ target: 12000 });
		expect(updateRes.status).toBe(200);
		expect(updateRes.body.target).toBe(12000);

		// Delete
		const deleteRes = await request(app).delete(`/api/health-goals/${created.id}`);
		expect(deleteRes.status).toBe(204);

		// Delete again -> 404
		const deleteAgain = await request(app).delete(`/api/health-goals/${created.id}`);
		expect(deleteAgain.status).toBe(404);
	});
});


