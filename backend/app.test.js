const request = require('supertest');
const app = require('./app');

describe('Backend API', () => {
  test('GET /api/places should return 200', async () => {
    const response = await request(app).get('/api/places');
    expect(response.statusCode).toBe(200);
  });
  
  test('GET /api/places should return array', async () => {
    const response = await request(app).get('/api/places');
    expect(Array.isArray(response.body)).toBe(true);
  });
});
