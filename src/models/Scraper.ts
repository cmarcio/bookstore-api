import cheerio from 'cheerio';
import axios from 'axios';

import { MongoDao } from "./MongoDao";

export abstract class Scraper<T> {
    dao: MongoDao<T>;

    constructor(dao: MongoDao<T>) {
        this.dao = dao;
    }

    abstract async update(): Promise<void>;

    async loadHtml(url: string) {
        const { data } = await axios.get(url);
        return cheerio.load(data);
    };
}