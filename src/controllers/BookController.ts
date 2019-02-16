import { Request, Response, NextFunction } from 'express';

/**
 * POST /book
 * Save a new book in the database
 */
const postBook = (req: Request, res: Response, next: NextFunction) => {
  res.send('post book');
};

/**
 * GET /books/{id}
 * Get book by id
 */
const getBook = (req: Request, res: Response, next: NextFunction) => {
  res.send('get book');
};

/**
* GET /books
* Get a list with all the books available
*/
const getBooks = (req: Request, res: Response, next: NextFunction) => {
  res.send('get books');
};

export const BookController = {
  postBook,
  getBook,
  getBooks,
}
