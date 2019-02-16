import chai, { expect } from 'chai';
import sinon, { SinonStub } from 'sinon';

import { ApplicationError } from '../../src/models/ApplicationError';
import { BookService } from '../../src/services/BookService';
import { IBook } from '../../src/interfaces/IBook';
import { MongoDao } from '../../src/models/MongoDao';

chai.use(require('sinon-chai'));
chai.use(require('chai-as-promised'));

const book: IBook = {
    name: 'Clean Code',
    isbn: '9780132350884',
    language: 'en',
    description: `Even bad code can function.
        But if code isn’t clean, it can bring
        a development organization to its knees.`,
};

describe('Book Service', () => {
    const sandbox = sinon.createSandbox();
    afterEach(() => sandbox.restore());

    describe('saveBook', () => {
        let stubSaveBook: SinonStub;

        beforeEach(() => stubSaveBook = sandbox.stub(MongoDao.prototype, 'save'));
        
        it('should save a new book in the database', async () => {
            sandbox.stub(MongoDao.prototype, 'findOne');
            await BookService.saveBook(book);
            expect(stubSaveBook).to.have.been.calledOnce;
            expect(stubSaveBook).to.have.been.calledWith(book);
        });

        it('should throw an error if the book already exists', async () => {
            sandbox.stub(MongoDao.prototype, 'findOne').resolves(book);
            const saveBookPromise = BookService.saveBook(book);
            await expect(saveBookPromise).to.have.been.rejectedWith(ApplicationError.BOOK_ALREADY_EXISTS);
            expect(stubSaveBook).to.not.have.been.called;
        });
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
