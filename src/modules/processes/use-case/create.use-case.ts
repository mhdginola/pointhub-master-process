import { objClean } from "@point-hub/express-utils";
import { ProcessEntity, ProcessStatusTypes } from "../model/process.entity.js";
import { CreateProcessesRepository } from "../model/repository/create.repository.js";
import { validate } from "../validation/create.validation.js";
import DatabaseConnection, { CreateOptionsInterface, DocumentInterface } from "@src/database/connection.js";

export class CreateProcessesUseCase {
  private db: DatabaseConnection;

  constructor(db: DatabaseConnection) {
    this.db = db;
  }

  public async handle(document: DocumentInterface, options: CreateOptionsInterface) {
    try {
      // validate request body
      validate(document);

      // save to database
      const processEntity = objClean(
        new ProcessEntity({
          name: document.name,
          firstName: document.firstName,
          lastName: document.lastName,
          optionalUniqueColumn: document.optionalUniqueColumn,
          status: ProcessStatusTypes.Active,
          createdAt: new Date(),
        })
      );

      const response = await new CreateProcessesRepository(this.db).handle(processEntity, options);

      return {
        acknowledged: response.acknowledged,
        _id: response._id,
      };
    } catch (error) {
      throw error;
    }
  }
}
