import express from 'express';
import path from 'path';
import morgan from 'morgan';
import expressValidator from 'express-validator';

import { BookRouter } from './routes/BookRouter';
import { ApplicationErrorHandler } from './middleware/ApplicationErrorHandler';
import { ErrorHandler } from './middleware/ErrorHandler';

// Create express server
const app = express();

/**
 * Middleware
 */
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressValidator())

/**
 * Route Handlers
 */
app.use(BookRouter);

/**
 * Route not found
 */
app.all('*', (req, res) => res.sendStatus(404));

/**
 * Error Handlers
 */
app.use(ApplicationErrorHandler);
app.use(ErrorHandler);

export default app;
