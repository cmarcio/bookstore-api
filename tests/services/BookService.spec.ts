import { Book } from '../../src/models/Book';

describe('Book Service', () => {
    describe('saveBook', () => {
        it('should save a new book in the database');

        it('should throw an error if the book is invalid');

        it('should throw an error if the book already exists');
    });

    describe('getBooks', () => {
        it('should return an empty array if there is no books in the database');
        
        it('should get all the books from the database');
    });

    describe('getBookById', () => {
        it('should get the book from the database');

        it('should return undefined if the book was not found');
    });
});
