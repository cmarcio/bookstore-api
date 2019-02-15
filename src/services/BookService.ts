import { Book } from '../models/Book';
import { IBook } from '../interfaces/IBook';

/**
 * Save a new book document in the database
 */
const saveBook = async (book: IBook): Promise<void> => {
    await Book.create(book);
};

/**
 * Get all book documents from the database
 */
const getBooks = async (): Promise<IBook[]> => {
    const books = await Book.find({});
    return books;
};

/**
 * Get a book document by the id attribute
 */
const getBookById = async (id: string): Promise<IBook> => {
    const book = await Book.findOne({ id });
    return book;
};

export default {
    saveBook,
    getBooks,
    getBookById,
}