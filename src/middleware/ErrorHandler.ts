import { Request, Response, NextFunction } from 'express';

export const ErrorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err);
    res.sendStatus(500);
}