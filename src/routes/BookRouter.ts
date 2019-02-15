import express from 'express';
import BookController from '../controllers/BookController';

const router = express.Router();

router.post('/book', BookController.postBook);
router.get('/books/:id', BookController.getBook);
router.get('/books', BookController.getBooks);

export default router;
