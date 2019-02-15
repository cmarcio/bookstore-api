import express from 'express';
import path from 'path';
// import morgan from 'morgan';

import * as bookController from './controllers/books';

// Create express server
const app = express();

/**
 * Middleware
 */
// app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

/**
 * Book Routes
 */
app.post('/book', bookController.postBook);
app.get('/books/:id', bookController.getBook);
app.get('/books', bookController.getBooks);

export default app;
