import { objClean } from "@point-hub/express-utils";
import { CoaGroupsEntity } from "../model/coa-groups.entity.js";
import { UpdateCoaGroupsRepository } from "../model/repository/update.repository.js";
import { validate } from "../validation/update.validation.js";
import DatabaseConnection, { UpdateOptionsInterface, DocumentInterface } from "@src/database/connection.js";

export class UpdateCoaGroupsUseCase {
  private db: DatabaseConnection;

  constructor(db: DatabaseConnection) {
    this.db = db;
  }

  public async handle(id: string, document: DocumentInterface, options: UpdateOptionsInterface) {
    try {
      // validate request body
      validate(document);

      // update database
      const coaGroupsEntity = new CoaGroupsEntity({
        name: document.name,
        updatedAt: new Date(),
      });

      const updateCoaGroupsRepository = new UpdateCoaGroupsRepository(this.db);
      await updateCoaGroupsRepository.handle(id, objClean(coaGroupsEntity), options);

      return;
    } catch (error) {
      throw error;
    }
  }
}
