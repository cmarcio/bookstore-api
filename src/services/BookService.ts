import { ApplicationError } from '../models/ApplicationError';
import { IBook } from '../interfaces/IBook';
import { MongoDao } from '../models/MongoDao';

const BookDao = new MongoDao<IBook>('Book');

/**
 * Save a new book document in the database
 */
const saveBook = async (newBook: IBook): Promise<void> => {
    const sameISBN = await getBookByISBN(newBook.isbn);
    if (sameISBN) {
        throw new Error(ApplicationError.BOOK_ALREADY_EXISTS);
    }
    await BookDao.save(newBook);
};

/**
 * Get all book documents from the database
 */
const getBooks = async (): Promise<IBook[]> => {
    const books = await BookDao.find({});
    return books;
};

/**
 * Get a book document by the id attribute
 */
const getBookById = async (id: string): Promise<IBook> => {
    const book = await BookDao.findOne({ id });
    return book;
};

/**
 * Get a book document by the isbn attribute
 */
const getBookByISBN = async (isbn: string): Promise<IBook> => {
    const book = await BookDao.findOne({ isbn });
    return book;
};

export const BookService = {
    saveBook,
    getBooks,
    getBookById,
}