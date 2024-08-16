import { Collection, OptionalUnlessRequiredId } from 'mongodb';
import { Repository } from './Repository';
import { RepositoryEntity } from './RepositoryEntity';
import { MongoDbClient } from './MongoDbClient';

export abstract class MongoRepository<T extends RepositoryEntity> implements Repository<T> {
  protected collection: Collection<T>;

  constructor(collectionName: string) {
    const client = MongoDbClient.getInstance().getClient();
    this.collection = client.db().collection<T>(collectionName);
  }
  async create(data: Omit<T, '_id' | 'created' | 'last_updated'>): Promise<RepositoryEntity> {
    const now = new Date();
    const document = { ...data, created: now, last_updated: now } as OptionalUnlessRequiredId<T>;
    const result = await this.collection.insertOne(document);
    return { ...document, _id: result.insertedId?.toString() };
  }
  async selectById(_id: string | number): Promise<T | null> {
    throw new Error('Method not implemented.');
  }
  async select(_filter: Partial<T>): Promise<T | null> {
    throw new Error('Method not implemented.');
  }
  async update(_id: string | number, _data: Partial<T>): Promise<T | null> {
    throw new Error('Method not implemented.');
  }
  async delete(_id: string | number): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
}
