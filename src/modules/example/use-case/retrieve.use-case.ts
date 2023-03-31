import { ExampleRepository } from "../model/example.repository.js";
import DatabaseConnection, { DocumentInterface, ReadOptionsInterface } from "@src/database/connection.js";

export class RetrieveExampleUseCase {
  private db: DatabaseConnection;

  constructor(db: DatabaseConnection) {
    this.db = db;
  }

  public async handle(document: DocumentInterface, options?: ReadOptionsInterface) {
    try {
      const exampleRepository = new ExampleRepository(this.db);
      const response = await exampleRepository.retrieve(document.id, options);
      return {
        ...response,
      };
    } catch (error) {
      throw error;
    }
  }
}
