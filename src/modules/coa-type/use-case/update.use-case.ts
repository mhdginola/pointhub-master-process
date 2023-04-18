import { objClean } from "@point-hub/express-utils";
import { CoaTypesEntity } from "../model/coa-types.entity.js";
import { UpdateCoaTypesRepository } from "../model/repository/update.repository.js";
import { validate } from "../validation/update.validation.js";
import DatabaseConnection, { UpdateOptionsInterface, DocumentInterface } from "@src/database/connection.js";

export class UpdateCoaTypesUseCase {
  private db: DatabaseConnection;

  constructor(db: DatabaseConnection) {
    this.db = db;
  }

  public async handle(id: string, document: DocumentInterface, options: UpdateOptionsInterface) {
    try {
      // validate request body
      validate(document);

      // update database
      const coaTypesEntity = new CoaTypesEntity({
        name: document.name,
        updatedAt: new Date(),
      });

      const updateCoaTypesRepository = new UpdateCoaTypesRepository(this.db);
      await updateCoaTypesRepository.handle(id, objClean(coaTypesEntity), options);

      return;
    } catch (error) {
      throw error;
    }
  }
}
