import DatabaseConnection, { DeleteOptionsInterface, DeleteResultInterface } from "@src/database/connection.js";
import DatabaseManager from "@src/database/database-manager.js";

export class DeleteCoaTypesRepository {
  public databaseManager;

  constructor(databaseConnection: DatabaseConnection) {
    this.databaseManager = new DatabaseManager(databaseConnection, "coaTypes");
  }

  public async handle(id: string, options?: DeleteOptionsInterface): Promise<DeleteResultInterface> {
    return await this.databaseManager.delete(id, options);
  }
}
