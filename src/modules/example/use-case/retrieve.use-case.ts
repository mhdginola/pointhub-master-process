import { ExampleRepository } from "../model/example.repository.js";
import DatabaseConnection, { ReadOptionsInterface } from "@src/database/connection.js";

export class RetrieveExampleUseCase {
  private db: DatabaseConnection;

  constructor(db: DatabaseConnection) {
    this.db = db;
  }

  public async handle(id: string, options?: ReadOptionsInterface) {
    try {
      const exampleRepository = new ExampleRepository(this.db);
      const response = await exampleRepository.retrieve(id, options);
      return {
        _id: response._id,
        name: response.name,
        status: response.status,
        createdAt: response.createdAt,
      };
    } catch (error) {
      throw error;
    }
  }
}
