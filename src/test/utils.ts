import { MongoClient, ObjectId } from "mongodb";
import databaseConfig from "@src/config/database.js";

export const resetDatabase = async () => {
  const client = await MongoClient.connect(databaseConfig[databaseConfig.default].url);
  const db = client.db(databaseConfig[databaseConfig.default].name);
  const collections = await db.listCollections().toArray();
  for (const collection of collections) {
    await db.collection(collection.name).deleteMany({});
  }
  client.close();
};

export const retrieve = async (collection: string, _id: string) => {
  const client = await MongoClient.connect(databaseConfig[databaseConfig.default].url);
  const db = client.db(databaseConfig[databaseConfig.default].name);
  const response = await db.collection(collection).findOne({
    _id: new ObjectId(_id),
  });
  client.close();
  return response;
};
