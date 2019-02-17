import { ObjectId } from 'mongodb';
import { ApplicationError, ErrorCode } from '../../src/models/ApplicationError';
import { BookService } from '../../src/services/BookService';
import { IBook } from '../../src/interfaces/IBook';
import { MongoDao } from '../../src/models/MongoDao';

jest.mock('../../src/models/MongoDao');

const book: IBook = {
    _id: new ObjectId(),
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

        beforeEach(() => spySaveBook = jest.spyOn(MongoDao.prototype, 'insertOne'));

        afterEach(() => spySaveBook.mockRestore());
        
        test('should save a new book in the database', async () => {
            jest.spyOn(MongoDao.prototype, 'findOne');
            await BookService.insertBook(book);
            expect(spySaveBook).toHaveBeenCalledWith(book);
        });

        test('should throw an error if the book already exists', async () => {
            jest.spyOn(MongoDao.prototype, 'findOne').mockResolvedValue(book);
            const saveBookPromise = BookService.insertBook(book);
            await expect(saveBookPromise).rejects.toThrow(new ApplicationError(ErrorCode.BOOK_ALREADY_EXISTS));
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
        test('should get the book from the database', async () => {
            const findOneSpy = jest.spyOn(MongoDao.prototype, 'findOne').mockResolvedValue(book);
            const bookFound = await BookService.getBookById(book._id);
            expect(bookFound).toEqual(book);
            expect(findOneSpy).toHaveBeenCalledWith({ _id: book._id });
        });

        test('should return undefined if the book was not found', async () => {
            const findOneSpy = jest.spyOn(MongoDao.prototype, 'findOne');
            const bookFound = await BookService.getBookById(book._id);
            expect(bookFound).toBeUndefined;
            expect(findOneSpy).toHaveBeenCalledWith({ _id: book._id });
        });
    });
});
