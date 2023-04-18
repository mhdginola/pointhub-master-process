import { DeleteCoaGroupsRepository } from "../model/repository/delete.repository.js";
import DatabaseConnection, { DeleteOptionsInterface } from "@src/database/connection.js";

export class DeleteCoaGroupsUseCase {
  private db: DatabaseConnection;

  constructor(db: DatabaseConnection) {
    this.db = db;
  }

  public async handle(id: string, options: DeleteOptionsInterface) {
    try {
      const response = await new DeleteCoaGroupsRepository(this.db).handle(id, options);

      return {
        acknowledged: response.acknowledged,
        deletedCount: response.deletedCount,
      };
    } catch (error) {
      throw error;
    }
  }
}
