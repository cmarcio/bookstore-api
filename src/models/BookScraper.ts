import cheerio from 'cheerio';
import axios from 'axios';

import { IBook } from '../interfaces/IBook';

export class BookScraper {
    async getBooks(): Promise<IBook[]> {
        let books = await this.scrapBooks();
        books = await this.scrapIsbn(books);
        return books;
    };

    private async scrapBooks() {
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
        return books;
    };

    private async scrapIsbn(books: any[]) {
        const newBooks = await Promise.all(books.map(async book => {
            let isbn: string;
            try {
                isbn = await this.getBookISBN(book.url);
                if (!isbn) isbn = 'Unavailable';
            } catch (error) {
                isbn = 'Unavailable';
            }
            const { url, ...newBook } = book;
            return { ...newBook, isbn };
        }));
        return newBooks;
    }

    private async getBookISBN(bookUrl: string) {
        const $ = await this.loadHtml(bookUrl);
        const { groups: { isbn } } = $('body').text().replace(/\s+/g, ' ')
            .match(/(isbn|ISBN).*(?<isbn>(97(8|9))?\d{9}(\d|X))/);
        return isbn;
    };

    private async loadHtml(url: string) {
        const { data } = await axios.get(url);
        return cheerio.load(data);
    };
};
