import { CoaTypesEntityInterface } from "../coa-types.entity.js";
import DatabaseConnection, { RetrieveOptionsInterface } from "@src/database/connection.js";
import DatabaseManager from "@src/database/database-manager.js";

interface ResponseInterface extends CoaTypesEntityInterface {
  _id: string;
}

export class RetrieveCoaTypesRepository {
  public databaseManager;

  constructor(databaseConnection: DatabaseConnection) {
    this.databaseManager = new DatabaseManager(databaseConnection, "coaTypes");
  }

  public async handle(id: string, options?: RetrieveOptionsInterface): Promise<ResponseInterface> {
    const response: CoaTypesEntityInterface = await this.databaseManager.retrieve(id, options);

    return {
      _id: response._id as string,
      ...response,
    };
  }
}
