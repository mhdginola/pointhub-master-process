import DatabaseConnection, {
  AggregateResultInterface,
  AggregateQueryInterface,
  AggregateOptionsInterface,
  DocumentInterface,
} from "@src/database/connection.js";
import DatabaseManager from "@src/database/database-manager.js";

export class AggregateCoaRepository {
  public databaseManager;

  constructor(databaseConnection: DatabaseConnection) {
    this.databaseManager = new DatabaseManager(databaseConnection, "coas");
  }
  public async aggregate(
    pipeline: DocumentInterface[],
    query: AggregateQueryInterface,
    options?: AggregateOptionsInterface
  ): Promise<AggregateResultInterface> {
    return await this.databaseManager.aggregate(pipeline, query, options);
  }
}
