import { CoaCategoryEntityInterface } from "../coa-category.entity.js";
import DatabaseConnection, { RetrieveOptionsInterface } from "@src/database/connection.js";
import DatabaseManager from "@src/database/database-manager.js";

interface ResponseInterface extends CoaCategoryEntityInterface {
  _id: string;
}

export class RetrieveCoaCategoriesRepository {
  public databaseManager;

  constructor(databaseConnection: DatabaseConnection) {
    this.databaseManager = new DatabaseManager(databaseConnection, "coaCategories");
  }

  public async handle(id: string, options?: RetrieveOptionsInterface): Promise<ResponseInterface> {
    const response: CoaCategoryEntityInterface = await this.databaseManager.retrieve(id, options);

    return {
      _id: response._id as string,
      ...response,
    };
  }
}
