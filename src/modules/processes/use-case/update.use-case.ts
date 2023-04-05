import { objClean } from "@point-hub/express-utils";
import { ProcessEntity } from "../model/process.entity.js";
import { UpdateProcessesRepository } from "../model/repository/update.repository.js";
import { validate } from "../validation/update.validation.js";
import DatabaseConnection, { UpdateOptionsInterface, DocumentInterface } from "@src/database/connection.js";

export class UpdateProcessesUseCase {
  private db: DatabaseConnection;

  constructor(db: DatabaseConnection) {
    this.db = db;
  }

  public async handle(id: string, document: DocumentInterface, options: UpdateOptionsInterface) {
    try {
      // validate request body
      validate(document);

      // update database
      const processEntity = new ProcessEntity({
        name: document.name,
        updatedAt: new Date(),
      });

      const processesRepository = new UpdateProcessesRepository(this.db);
      await processesRepository.handle(id, objClean(processEntity), options);

      return;
    } catch (error) {
      throw error;
    }
  }
}
