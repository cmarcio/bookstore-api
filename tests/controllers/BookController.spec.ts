// tslint:disable-next-line:import-name
import request from 'supertest';
import app from '../../src/app';
import { IBook } from '../../src/interfaces/IBook';
import { BookDao } from '../../src/models/BookDao';

const bookDao = new BookDao();

let bookId: string;
const book: IBook = {
    title: 'Design Patterns',
    description: `Capturing a wealth of experience about the design of object-oriented software,
        four top-notch designers present a catalog of simple and succinct solutions to commonly
        occurring design problems. Previously undocumented, these 23 patterns allow designers to
        create more flexible, elegant, and ultimately reusable designs without having to rediscover
        the design solutions themselves.`,
    isbn: "0201633612",
    language: 'en'
};

describe('Books Costroller', () => {
    beforeAll(async () => await bookDao.delete({}));

    afterAll(async () => await bookDao.delete({}));

    describe('POST /book', () => {
        test('should create a new book', async () => {
            await request(app)
                .post('/book')
                .send({ ...book })
                .expect(201);
        });

        test('should not created a book that already exists', async () => {
            await request(app)
                .post('/book')
                .send({ ...book })
                .expect(409);
        });
    });

    describe('GET /books', () => {
        test('should return the books array', async () => {
            const { body } = await request(app)
                .get('/books')
                .expect(200);
            bookId = body.books[0]._id;
            expect(body).toEqual({
                numberBooks: 1,
                books: [
                    { ...book, _id: bookId}
                ]
            })
        });
    });

    describe('GET /books/id', () => {
        test('should respond with 200', async () => {
            const { body } = await request(app)
                .get(`/books/${bookId}`)
                .expect(200);
            expect(book).toEqual({ ...book })
        });
    });
});
