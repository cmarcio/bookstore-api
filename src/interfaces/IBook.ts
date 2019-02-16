import { ObjectID } from 'mongodb'

export interface IBook {
    _id: ObjectID,
    name: string,
    description?: string,
    isbn: string,
    language?: string
};