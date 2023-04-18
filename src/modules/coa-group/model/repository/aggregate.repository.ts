import DatabaseConnection, {
  AggregateResultInterface,
  AggregateQueryInterface,
  AggregateOptionsInterface,
} from "@src/database/connection.js";
import DatabaseManager from "@src/database/database-manager.js";

export class AggregateCoaGroupsRepository {
  public databaseManager;

  constructor(databaseConnection: DatabaseConnection) {
    this.databaseManager = new DatabaseManager(databaseConnection, "coaGroups");
  }
  public async aggregate(
    pipeline: never,
    query: AggregateQueryInterface,
    options?: AggregateOptionsInterface
  ): Promise<AggregateResultInterface> {
    return await this.databaseManager.aggregate(pipeline, query, options);
  }
}
