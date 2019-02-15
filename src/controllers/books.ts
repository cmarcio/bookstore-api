import { Request, Response, NextFunction } from 'express';

/**
 * POST /book
 * Save a new book in the database
 */
export const postBook = (req: Request, res: Response, next: NextFunction) => {
  res.send('post book');
};

/**
 * GET /books/{id}
 * Get book by id
 */
export const getBook = (req: Request, res: Response, next: NextFunction) => {
  res.send('get book');
};

/**
 * GET /books
 * Get a list with all the books available
 */
export const getBooks = (req: Request, res: Response, next: NextFunction) => {
  res.send('get books');
};
