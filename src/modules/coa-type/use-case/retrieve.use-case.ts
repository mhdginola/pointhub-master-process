import { CoaTypesStatusTypes } from "../model/coa-types.entity.js";
import { RetrieveCoaTypesRepository } from "../model/repository/retrieve.repository.js";
import DatabaseConnection, { RetrieveOptionsInterface } from "@src/database/connection.js";

interface ResponseInterface {
  _id: string;
  name?: string;
  status?: CoaTypesStatusTypes;
  createdAt?: Date;
  isArchive?: boolean;
}

export class RetrieveCoaTypesUseCase {
  private db: DatabaseConnection;

  constructor(db: DatabaseConnection) {
    this.db = db;
  }

  public async handle(id: string, options?: RetrieveOptionsInterface): Promise<ResponseInterface> {
    try {
      const response = await new RetrieveCoaTypesRepository(this.db).handle(id, options);

      return {
        _id: response._id,
        name: response.name,
        createdAt: response.createdAt,
      };
    } catch (error) {
      throw error;
    }
  }
}
