import express from 'express';
import { BookController } from '../controllers/BookController';
import { BookValidator, IdValidator, ValidationHandler } from '../middleware/Validators';

const router = express.Router();

router.post('/book', BookValidator, ValidationHandler, BookController.postBook);
router.get('/books/:id', IdValidator, ValidationHandler, BookController.getBook);
router.get('/books', BookController.getBooks);

export const BookRouter = router;
