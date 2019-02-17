import { ObjectID } from 'mongodb';
import { ApplicationError, ErrorCode } from '../models/ApplicationError';
import { IBook } from '../interfaces/IBook';
import { MongoDao } from '../models/MongoDao';

const BookDao = new MongoDao<IBook>('Book');

/**
 * Save a new book document in the database
 */
const insertBook = async (newBook: IBook): Promise<void> => {
    const sameISBN = await getBookByISBN(newBook.isbn);
    if (sameISBN) {
        throw new ApplicationError(ErrorCode.BOOK_ALREADY_EXISTS);
    }
    await BookDao.insertOne(newBook);
};

/**
 * Get all book documents from the database
 */
const getBooks = async (): Promise<IBook[]> => {
    // TODO implement paginantion
    const books = await BookDao.find({});
    return books;
};

/**
 * Get a book document by the id attribute
 */
const getBookById = async (_id: ObjectID): Promise<IBook> => {
    const book = await BookDao.findOne({ _id });
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
    const book = await BookDao.findOne({ isbn });
    return book;
};

export const BookService = {
    insertBook,
    getBooks,
    getBookById,
}