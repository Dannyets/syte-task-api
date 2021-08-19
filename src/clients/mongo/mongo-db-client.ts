import { MongoClient, Db } from "mongodb";
import { toMongoId } from './mongo-utils';
import * as bulkOperations from './bulk-operations';
import { BulkOperation, Document } from './mongo-types';
import { getByIds } from './mongo-filters';

export let mongoClient: MongoDbClient;

export class MongoDbClient {
  client: MongoClient;
  db: Db;

  constructor(host: string) {
    this.client = new MongoClient(host);
  }

  async connect(dbName: string) {
    try {
      await this.client.connect();
      console.log("Connected successfully to mongo");
      this.db = this.client.db(dbName);
    } catch (error) {
      console.log("Failed to connect to mongo db", { error });
      throw error;
    }
  }

  getCollection(name: string) {
    return this.db.collection(name);
  }

  get(collection: string, filter?: any): Promise<Document[]> {
    return this.getCollection(collection).find(filter).toArray();
  }

  async updateOne(collection: string, document: Document) {
    const { _id, ...propsToUpdate } = document;
    const result = await this.getCollection(collection).updateOne(
      {
        _id: toMongoId(_id as string),
      },
      { $set: { ...propsToUpdate } }
    );
    return result;
  }

  async create(collection: string, document: Document): Promise<Document> {
    const res = await this.getCollection(collection).insertOne(document as any);

    return { _id: res.insertedId, ...document };
  }

  remove(collection: string, id: string) {
    return this.getCollection(collection).deleteOne({ _id: toMongoId(id) });
  }

  getMany(collection: string, ids?: string[]): Promise<Document[]> {
    const filter = getByIds(ids);
    return this.get(collection, filter);
  }

  async insertMany(
    collection: string,
    documents: Document[]
  ): Promise<Document[]> {
    if (!documents || documents.length === 0) {
      return documents;
    }
    try { 
      const result = await this.getCollection(collection).insertMany(documents as any);
      const ids = Object.values(result.insertedIds).map((objId) =>
        objId.toString()
      );
      return this.getMany(collection, ids);
    } catch(err){
      console.log('Error while adding documents to db.', { err });
      throw err;
    }
  }

  async updateMany(collection: string, documents: Document[]) {
    if (!documents || documents.length === 0) {
      return documents;
    }
    const result = await this.bulk(collection, documents, bulkOperations.updateOne);
    return result;
  }

  async removeMany(collection: string, ids: string[]) {
    if (!ids || ids.length === 0) {
      return;
    }
    const filter = getByIds(ids);
    const result = await this.getCollection(collection).deleteMany(filter);
    return result;
  }

  async bulk(collection: string, documents: any[], operation: BulkOperation) {
    if (!documents || documents.length === 0) {
      return documents;
    }
    const operationName = (operation as any).name;
    const bulkOperations = documents
      .map(operation)
      .map((query) => ({ [operationName]: query }));
    const result = await this.getCollection(collection).bulkWrite(
      bulkOperations as any
    );
    return result;
  }
}

export const initMongoClient = async (
  dbName: string,
  host: string,
  username?: string,
  password?: string
) => {
  const credentials = username && password ? `${username}:${password}@` : "";

  const connectionString = `mongodb://${credentials}${host}`;

  mongoClient = new MongoDbClient(connectionString);

  await mongoClient.connect(dbName);
};
