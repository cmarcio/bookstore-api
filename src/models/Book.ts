import mongoose, { Schema } from 'mongoose';

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
    },
    language: {
        type: String,
        trim: true,
    }
});

export default mongoose.model('Book', BookSchema);