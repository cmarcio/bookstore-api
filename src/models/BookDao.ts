import { MongoDao } from "./MongoDao";
import { IBook } from "../interfaces/IBook";

export class BookDao extends MongoDao<IBook> {

    constructor() {
        super('Book');
    };
};
