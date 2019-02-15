import mongoose, { Schema, Model } from 'mongoose';
import { IBook } from '../interfaces/IBook';

const BookSchema = new Schema({
    title: {
        type: String,
        trim: true,
        required: true,
    },
    description: {
        type: String,
        trim: true,
        default: '',
    },
    isbn: {
        type: String,
        trim: true,
        required: true,
        index: true,
        default: 'Unavailable'
    },
    language: {
        type: String,
        trim: true,
    }
});

export const Book: Model<IBook> = mongoose.model<IBook>('Book', BookSchema);
