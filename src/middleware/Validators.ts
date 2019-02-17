import { body, param, validationResult } from 'express-validator/check';
import { Request, Response, NextFunction } from 'express';
import { ObjectID } from 'mongodb';

export const IdValidator = [
    param('id', 'invalid id').custom((value, {}) => {
        if (ObjectID.isValid(value.replace('"', ''))) {
            return true;
        } else {
            throw new Error('Invalid id');
        }
    })
];

export const BookValidator = [
    body('title', "'title' is required").exists(),
    body('description', "'description' is required").exists(),
    body('description', 'character count exceeded').isLength({ max: 500 }),
    body('isbn', "'isbn' is required").exists(),
    body('isbn', "'isbn' must have the ISBN format").isISBN(),
    body('language', "'language' is required").exists(),
    body('language', "'language' must have the 2-5 uppercase characters").isLength({ min: 2, max: 5 }).isUppercase(),
];

export const ValidationHandler = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        next();
    } else {
        res.status(422).json({ errors: errors.array() });
    }
};