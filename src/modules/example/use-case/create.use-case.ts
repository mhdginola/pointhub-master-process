import { ExampleEntity } from "../model/example.entity.js";
import { ExampleRepository } from "../model/example.repository.js";
import { validate } from "../validation/create.validation.js";
import DatabaseConnection, { CreateOptionsInterface, DocumentInterface } from "@src/database/connection.js";

export class CreateExampleUseCase {
  private db: DatabaseConnection;

  constructor(db: DatabaseConnection) {
    this.db = db;
  }

  public async handle(document: DocumentInterface, options: CreateOptionsInterface) {
    try {
      validate(document);

      const exampleEntity = new ExampleEntity({
        name: document.name,
      });

      const exampleRepository = new ExampleRepository(this.db);
      const response = await exampleRepository.create(exampleEntity, options);
      return {
        acknowledged: response.acknowledged,
        _id: response._id,
      };
    } catch (error) {
      throw error;
    }
  }
}
