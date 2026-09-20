const request = require('supertest');
const app = require('./app');

describe('Backend API Tests', () => {
  test('GET /api/places should return 200', async () => {
    const response = await request(app).get('/api/places');
    expect(response.statusCode).toBe(200);
  });

  test('GET /api/places should return array', async () => {
    const response = await request(app).get('/api/places');
    expect(Array.isArray(response.body)).toBe(true);
  });

  test('GET /api/places should have data', async () => {
    const response = await request(app).get('/api/places');
    expect(response.body.length).toBeGreaterThan(0);
  });

  test('GET /api/health should work', async () => {
    const response = await request(app).get('/api/health');
    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe('ok');
    expect(response.body.count).toBe(9714);
  });
});
