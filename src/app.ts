import express from 'express';
import path from 'path';
import morgan from 'morgan';

import { BookRouter } from './routes/BookRouter';

// Create express server
const app = express();

/**
 * Middleware
 */
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

/**
 * Route Handlers
 */
app.use(BookRouter);

/**
 * Route not found
 */
app.all('*', (req, res) => res.sendStatus(404));

export default app;
