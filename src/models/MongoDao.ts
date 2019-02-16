import { MongoClient, Collection } from 'mongodb';
import ApplicationError from './ApplicationError';

const url = process.env.MONGODB_URL || 'mongodb://localhost:27017';
const database = process.env.MONGODB_DBNAME || 'library';

export class MongoDao<T> {
    private client: MongoClient;
    private collection: Collection<T>;
    private collectionName: string;

    constructor(collectionName: string) {
        this.client = new MongoClient(url);
        this.collectionName = collectionName;
    };

    private isConnected(): boolean {
        return this.client.isConnected();
    };

    private async connect(): Promise<void> {
        try {
            await this.client.connect();
            this.collection = this.client.db(database).collection(this.collectionName);
        } catch (error) {
            console.error(error);
            throw new Error(ApplicationError.DATABASE_CONNECTION_ERROR);
        }
    };
    
    private async checkConnection() {
        if (!this.isConnected()) {
            this.connect();
        }
    };

    async findOne(query: Object): Promise<T> {
        this.checkConnection();
        return this.collection.findOne(query);
    }

    async find(query: Object): Promise<T[]> {
        this.checkConnection();
        return this.collection.find(query).toArray();
    }

    async save(document: T): Promise<void> {
        this.checkConnection();
        await this.collection.save(document);
    }
}