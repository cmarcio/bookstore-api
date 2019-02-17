import { Request, Response, NextFunction } from 'express';
import { ApplicationError } from '../models/ApplicationError';

export const ApplicationErrorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof ApplicationError) {
        console.error(err);
        res.status(err.status).send({ message: err.message });
    } else {
        next(err);
    }
}