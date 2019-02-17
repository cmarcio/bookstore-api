import { MongoClient, Collection } from 'mongodb';
import { ApplicationError, ErrorCode } from './ApplicationError';

const url = process.env.MONGODB_URL || 'mongodb://localhost:27017';
const database = process.env.MONGODB_DBNAME || 'library';

export class MongoDao<T> {
    private client: MongoClient;
    private collection: Collection<T>;
    private collectionName: string;

    constructor(collectionName: string) {
        this.client = new MongoClient(url, { useNewUrlParser: true });
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
            throw new ApplicationError(ErrorCode.DATABASE_CONNECTION_ERROR);
        }
    };
    
    async checkConnection() {
        if (!this.isConnected()) {
            await this.connect();
        }
    };

    async findOne(query: Object): Promise<T> {
        await this.checkConnection();
        return this.collection.findOne(query);
    }

    async find(query: Object): Promise<T[]> {
        await this.checkConnection();
        return this.collection.find(query).toArray();
    }

    async findOneAndUpdate(query: Object, values: Object) {
        await this.checkConnection();
        return this.collection.findOneAndUpdate(query, { $set: values});
    }

    async insertOne(document: T): Promise<void> {
        await this.checkConnection();
        await this.collection.insertOne(document);
    }

    async delete(query: Object): Promise<void> {
        await this.checkConnection();
        await this.collection.deleteMany(query);
    }
}