import { Request, Response, NextFunction } from 'express';

export const ErrorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    // TODO use a loggin library to log the error
    res.sendStatus(500);
}