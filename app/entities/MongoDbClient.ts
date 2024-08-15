import { DatabaseClient } from './DatabaseClient';
import { MongoClient, ServerApiVersion } from 'mongodb';
import * as dotenv from 'dotenv';

dotenv.config();

export class MongoDbClient implements DatabaseClient {
  private client: MongoClient;
  private static instance: MongoDbClient;

  private constructor() {
    const MONGO_DB_USER = process.env.MONGO_DB_USER ? process.env.MONGO_DB_USER : 'MONGO_USER_NOT_FOUND';
    const MONGO_DB_PASSWORD = process.env.MONGO_DB_PASSWORD
      ? process.env.MONGO_DB_PASSWORD
      : 'MONGO_PASSWORD_NOT_FOUND';
    const MONGO_DB_HOST = process.env.MONGO_DB_HOST ? process.env.MONGO_DB_HOST : 'MONGO_HOST_NOT_FOUND';
    const MONGO_DB_APP_NAME = process.env.MONGO_DB_APP_NAME
      ? process.env.MONGO_DB_APP_NAME
      : 'MONGO_APP_NAME_NOT_FOUND';

    const url = `mongodb+srv://${MONGO_DB_USER}:${encodeURIComponent(
      MONGO_DB_PASSWORD,
    )}@${MONGO_DB_HOST}/?retryWrites=true&w=majority&appName=${MONGO_DB_APP_NAME}`;

    this.client = new MongoClient(url, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });
  }

  static getInstance(): MongoDbClient {
    if (!MongoDbClient.instance) {
      MongoDbClient.instance = new MongoDbClient();
    }
    return MongoDbClient.instance;
  }

  getClient(): MongoClient {
    return this.client;
  }

  async connect(): Promise<void> {
    console.log('Connecting to MongoDb...');
    try {
      await this.client.connect();
      await this.client.db('admin').command({ ping: 1 });
      console.log('Pinged MongoDb. Successful connection.');
    } catch (err) {
      console.log(err);
    }
  }

  async disconnect(): Promise<void> {
    console.log('Closing MongoDb connection...');
    try {
      await this.client.close();
      console.log('Closed connection to MongoDb.');
    } catch (err) {
      console.log(err);
    }
  }
}
