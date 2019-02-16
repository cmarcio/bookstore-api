import { ApplicationError } from '../../src/models/ApplicationError';
import { BookService } from '../../src/services/BookService';
import { IBook } from '../../src/interfaces/IBook';
import { MongoDao } from '../../src/models/MongoDao';

jest.mock('../../src/models/MongoDao');

const book: IBook = {
    name: 'Clean Code',
    isbn: '9780132350884',
    language: 'en',
    description: `Even bad code can function.
        But if code isn’t clean, it can bring
        a development organization to its knees.`,
};

describe('Book Service', () => {
    describe('saveBook', () => {
        let spySaveBook: jest.SpyInstance;

        beforeEach(() => spySaveBook = jest.spyOn(MongoDao.prototype, 'save'));

        afterEach(() => spySaveBook.mockRestore());
        
        test('should save a new book in the database', async () => {
            jest.spyOn(MongoDao.prototype, 'findOne');
            await BookService.saveBook(book);
            expect(spySaveBook).toHaveBeenCalledWith(book);
        });

        test('should throw an error if the book already exists', async () => {
            jest.spyOn(MongoDao.prototype, 'findOne').mockResolvedValue(book);
            const saveBookPromise = BookService.saveBook(book);
            await expect(saveBookPromise).rejects.toThrow(ApplicationError.BOOK_ALREADY_EXISTS);
            expect(spySaveBook).not.toHaveBeenCalled();
        });
    });

    describe('getBooks', () => {
        test('should return an empty array if there is no books in the database', async () => {
            jest.spyOn(MongoDao.prototype, 'find').mockResolvedValue([]);
            const books = await BookService.getBooks();
            expect(books).toEqual([]);
        });
        
        test('should get all the books from the database', async () => {
            jest.spyOn(MongoDao.prototype, 'find').mockResolvedValue([ book ]);
            const books = await BookService.getBooks();
            expect(books).toEqual([ book ])
        });
    });

    describe('getBookById', () => {
        test.todo('should get the book from the database');

        test.todo('should return undefined if the book was not found');
    });
});
