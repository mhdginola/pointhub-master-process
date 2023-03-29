import { BaseCommand } from "@point-hub/express-cli";
import databaseConfig from "@src/config/database.js";
import MongoDbConnection from "@src/database/connection-mongodb.js";
import DatabaseConnection from "@src/database/connection.js";

export default class DbSeedCommand extends BaseCommand {
  constructor() {
    super({
      name: "db:seed",
      description: "Seed database",
      summary: "Seed database",
      arguments: [],
      options: [],
    });
  }
  async handle(): Promise<void> {
    try {
      const dbConnection = new DatabaseConnection(
        new MongoDbConnection({
          name: databaseConfig[databaseConfig.default].name,
          url: databaseConfig[databaseConfig.default].url,
        })
      );
      dbConnection.database(databaseConfig[databaseConfig.default].name);

      // seed examples colllection
      const { exampleSeeds } = await import("@src/modules/example/model/example.seed.js");
      await dbConnection.collection("examples").deleteAll();
      const exampleData = await dbConnection.collection("examples").createMany(exampleSeeds);
      console.info(`[seed] seeding examples data`, exampleData);
    } catch (error) {
      console.error(error);
    }
  }
}
