const request = require('supertest');
const app = require('../server');

describe('Books API', () => {
  it('GET /api/books should return all books', async () => {
    const res = await request(app).get('/api/books');
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('GET /api/books/:id should return a single book', async () => {
    const res = await request(app).get('/api/books/1');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('title');
  });

  it('POST /api/books should create a new book', async () => {
    const newBook = { title: 'New Test Book', author: 'Tester', available: true };
    const res = await request(app).post('/api/books').send(newBook);
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.title).toBe('New Test Book');
  });

  it('PUT /api/books/:id should update a book', async () => {
    const res = await request(app)
      .put('/api/books/1')
      .send({ title: 'Updated Title' });
    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe('Updated Title');
  });

  it('DELETE /api/books/:id should delete a book', async () => {
    const res = await request(app).delete('/api/books/2');
    expect(res.statusCode).toBe(200);
  });

  it('GET /api/books/:id should return 404 for invalid ID', async () => {
    const res = await request(app).get('/api/books/100');
    expect(res.statusCode).toBe(404);
  });
});
