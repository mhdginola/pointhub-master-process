import { ProcessStatusTypes } from "../model/process.entity.js";
import { RetrieveProcessesRepository } from "../model/repository/retrieve.repository.js";
import DatabaseConnection, { RetrieveOptionsInterface } from "@src/database/connection.js";

interface ResponseInterface {
  _id: string;
  name?: string;
  status?: ProcessStatusTypes;
  createdAt?: Date;
  isArchive?: boolean;
}

export class RetrieveProcessesUseCase {
  private db: DatabaseConnection;

  constructor(db: DatabaseConnection) {
    this.db = db;
  }

  public async handle(id: string, options?: RetrieveOptionsInterface): Promise<ResponseInterface> {
    try {
      const response = await new RetrieveProcessesRepository(this.db).handle(id, options);

      return {
        _id: response._id,
        name: response.name,
        status: response.status,
        createdAt: response.createdAt,
        isArchive: response.isArchive,
      };
    } catch (error) {
      throw error;
    }
  }
}
