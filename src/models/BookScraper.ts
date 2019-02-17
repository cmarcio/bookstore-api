
import { IBook } from '../interfaces/IBook';
import { Scraper } from './Scraper';
import { BookDao } from './BookDao';
import { ISchedulable } from '../interfaces/ISchedulable';

export class BookScraper extends Scraper<IBook> implements ISchedulable {

    constructor() {
        super(new BookDao());
    };

    async runTask() {
        await this.update();
        console.log('Books update complete.')
    };

    /**
     * Craw the book data from the internet and than update/save the books in the database
     */
    async update() {
        const books = await this.scrapBooks();
        await this.dao.checkConnection(); // GAMBS REPORT: avoid the next line race condition on the connect method
        await Promise.all(books.map(async book => {
            if (!book.isbn) return;
            const query = book.isbn === 'Unavailable' ? { title: book.title } : { isbn: book.isbn };
            const { lastErrorObject: { updatedExisting } } = await this.dao.findOneAndUpdate(query, book)
            if (!updatedExisting) {
                await this.dao.insertOne(book);
            }
        }));
    };

    /**
     * Scrap the book data from the website and return the books array
     */
    private async scrapBooks(): Promise<IBook[]> {
        const $ = await this.loadHtml('https://kotlinlang.org/docs/books.html');

        let books: any[] = [];
        $('article.page-content').find('h2').each((_, elem) => {
            const title = $(elem).text().trim();
            const subitems = $(elem).nextUntil('h2');
            const language = $(subitems).filter('.book-lang').first().text().trim().toUpperCase();
            const description = $(subitems).filter('p').first().text().replace(/\s+/g, ' ').trim();
            const url = $(subitems).filter('a').attr('href');
            books.push({ title, description, language, url });
        });

        books = await this.mapISBN(books);
        return books;
    };

    /**
     * Receives an array of books and return an array of books with the ISBN attribute
     */
    private async mapISBN(books: any[]) {
        const newBooks = await Promise.all(books.map(async book => {
            let isbn: string;
            try {
                isbn = await this.searchBookISBN(book.url);
            } catch (error) {
                return book;
            }
            const { url, ...newBook } = book;
            return { ...newBook, isbn };
        }));
        return newBooks;
    };


    /**
     * Search for the book ISBN on a webpage and then return the ISBN founded or 'Unavailable'
     */
    private async searchBookISBN(bookUrl: string) {
        const $ = await this.loadHtml(bookUrl);
        const result = $('body').text().replace(/\s+/g, ' ')
            .match(/(isbn|ISBN).*?(?<isbn>(97(8|9))?\d{9}(\d|X))/);
        return result ? result.groups.isbn : "Unavailable";
    };
};
