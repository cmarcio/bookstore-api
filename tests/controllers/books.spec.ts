// tslint:disable-next-line:import-name
import request from 'supertest';
import app from '../../src/app';

describe('Books Costroller', () => {
  describe('POST /book', () => {
    it('should respond with 200', async () => {
      await request(app)
        .post('/book')
        .expect(200);
    });
  });

  describe('GET /books', () => {
    it('should respond with 200', async () => {
      await request(app)
        .get('/books')
        .expect(200);
    });
  });

  describe('GET /book/id', () => {
    const id = 23;

    it('should respond with 200', async () => {
      await request(app)
        .get(`/books/${id}`)
        .expect(200);
    });
  });
});
