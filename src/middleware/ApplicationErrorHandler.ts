import { Request, Response, NextFunction } from 'express';
import { ApplicationError } from '../models/ApplicationError';

export const ApplicationErrorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof ApplicationError) {
        // TODO use a logging library to log the error
        res.status(err.status).send({ message: err.message });
    } else {
        next(err);
    }
}