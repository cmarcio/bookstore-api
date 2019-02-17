import { Request, Response, NextFunction } from 'express';
import { BookService } from '../services/BookService';

/**
 * POST /book
 * Save a new book in the database
 */
const postBook = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await BookService.insertBook(req.body);
        res.status(201).send(req.body);
    } catch (error) {
        next(error);
    }
};

/**
 * GET /books/{id}
 * Get book by id
 */
const getBook = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const book = await BookService.getBookById(req.params.id);
        res.send(book);
    } catch (error) {
        next(error);
    }
};

/**
* GET /books
* Get a list with all the books available
*/
const getBooks = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const books = await BookService.getBooks();
        res.send({
            numberBooks: books.length,
            books,
        });
    } catch (error) {
        next(error);
    }
};

export const BookController = {
    postBook,
    getBook,
    getBooks,
}
