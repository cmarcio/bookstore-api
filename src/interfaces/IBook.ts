import { ObjectID } from 'mongodb'

export interface IBook {
    _id?: ObjectID, // TODO change to id
    title: string,
    description?: string,
    isbn: string,
    language?: string
};