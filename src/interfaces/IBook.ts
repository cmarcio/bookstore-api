import { Document } from 'mongoose';

export interface IBook extends Document {
    name: string,
    description?: string,
    isbn: string,
    language?: string
};