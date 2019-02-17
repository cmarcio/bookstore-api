import { ObjectID } from 'mongodb';
import { ApplicationError, ErrorCode } from '../models/ApplicationError';
import { IBook } from '../interfaces/IBook';
import { BookDao } from '../models/BookDao';

const bookDao = new BookDao();

/**
 * Save a new book document in the database
 */
const insertBook = async (newBook: IBook): Promise<void> => {
    const sameISBN = await getBookByISBN(newBook.isbn);
    if (sameISBN) {
        throw new ApplicationError(ErrorCode.BOOK_ALREADY_EXISTS);
    }
    await bookDao.insertOne(newBook);
};

/**
 * Get all book documents from the database
 */
const getBooks = async (): Promise<IBook[]> => {
    // TODO implement paginantion
    const books = await bookDao.find({});
    return books;
};

/**
 * Get a book document by the id attribute
 */
const getBookById = async (id: string): Promise<IBook> => {
    const book = await bookDao.findOne({ _id: new ObjectID(id) });
    if (book) {
        return book;
    } else {
        throw new ApplicationError(ErrorCode.BOOK_NOT_FOUND_BY_ID);
    }
};

/**
 * Get a book document by the isbn attribute
 */
const getBookByISBN = async (isbn: string): Promise<IBook> => {
    const book = await bookDao.findOne({ isbn });
    return book;
};

export const BookService = {
    insertBook,
    getBooks,
    getBookById,
}