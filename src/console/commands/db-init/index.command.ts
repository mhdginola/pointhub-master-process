import { BaseCommand } from "@point-hub/express-cli";
import databaseConfig from "@src/config/database.js";
import MongoDbConnection from "@src/database/connection-mongodb.js";
import DatabaseConnection from "@src/database/connection.js";

export default class DbInitCommand extends BaseCommand {
  constructor() {
    super({
      name: "db:init",
      description: "Create database collections and schema validation",
      summary: "Create database collections and schema validation",
      arguments: [],
      options: [],
    });
  }

  async handle(): Promise<void> {
    const dbConnection = new DatabaseConnection(
      new MongoDbConnection({
        name: databaseConfig[databaseConfig.default].name,
        url: databaseConfig[databaseConfig.default].url,
      })
    );
    try {
      await dbConnection.open();
      dbConnection.database(databaseConfig[databaseConfig.default].name);
      // add collections and schema validation
      await dbConnection.createCollections();
    } catch (error) {
      console.error(error);
    }
  }
}