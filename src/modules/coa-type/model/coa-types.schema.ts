/**
 * MongoDB Schema
 *
 * https://www.mongodb.com/docs/v6.0/core/schema-validation/update-schema-validation/
 * https://www.mongodb.com/docs/drivers/node/current/fundamentals/indexes/
 * https://www.mongodb.com/developer/products/mongodb/mongodb-schema-design-best-practices/
 */
import { IDatabaseAdapter } from "@src/database/connection.js";
import { MongoDBHelper } from "@src/database/mongodb/mongodb-helper.js";

export const collection = "coaTypes";

export async function createCollection(db: IDatabaseAdapter) {
  try {
    const helper = new MongoDBHelper(db);

    if (!(await helper.isExists(collection))) {
      console.info(`[schema] ${collection} - create collection`);
      await db.createCollection(collection);
    }

    console.info(`[schema] ${collection} - update schema`);
    await db.updateSchema(collection, {
      bsonType: "object",
      required: ["name"],
      properties: {
        name: {
          bsonType: "string",
          description: "The name for the example",
        },
      },
    });

    console.info(`[schema] ${collection} - create unique attribute "name"`);
    await helper.createUnique(collection, {
      name: -1,
    });

    console.info(`[schema] ${collection} - create unique attribute "optionalUniqueColumn" if the field is exists`);
    await helper.createUniqueIfNotNull(collection, {
      optionalUniqueColumn: -1,
    });
  } catch (error) {
    throw error;
  }
}

export async function dropCollection(db: IDatabaseAdapter) {
  try {
    const helper = new MongoDBHelper(db);

    if (await helper.isExists(collection)) {
      await db.dropCollection(collection);
      console.info(`[schema] drop ${collection} collection`);
    }
  } catch (error) {
    throw error;
  }
}
