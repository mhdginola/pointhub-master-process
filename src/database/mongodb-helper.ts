import { IDatabaseAdapter } from "./connection.js";

export class MongoDBHelper {
  private db;

  constructor(db: IDatabaseAdapter) {
    this.db = db;
  }

  /**
   * https://www.mongodb.com/docs/drivers/node/current/fundamentals/indexes/
   * https://www.mongodb.com/docs/manual/reference/collation/
   */
  public async createUnique(collection: string, property: string) {
    await this.db.createIndex(
      collection,
      { [property]: -1 },
      {
        unique: true,
        collation: {
          locale: "en",
          strength: 2,
        },
      }
    );
  }

  public async isExists(name: string) {
    const collections = (await this.db.listCollections()) as [];
    return collections.some(function (collection: { name: string }) {
      return collection.name === name;
    });
  }
}
