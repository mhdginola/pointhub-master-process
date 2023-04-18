import { objClean } from "@point-hub/express-utils";
import { CoaEntity } from "../model/coa.entity.js";
import { UpdateCoaRepository } from "../model/repository/update.repository.js";
import { validate } from "../validation/update.validation.js";
import DatabaseConnection, { UpdateOptionsInterface, DocumentInterface } from "@src/database/connection.js";

export class UpdateCoaUseCase {
  private db: DatabaseConnection;

  constructor(db: DatabaseConnection) {
    this.db = db;
  }

  public async handle(id: string, document: DocumentInterface, options: UpdateOptionsInterface) {
    try {
      // validate request body
      validate(document);

      // update database
      const coaEntity = new CoaEntity({
        number: document.number,
        name: document.name,
        type_id: document.type_id,
        category_id: document.category_id,
        group_id: document.group_id,
        subledger: document.subledger,
        position: document.position,
        updatedAt: new Date(),
      });

      const updateCoaRepository = new UpdateCoaRepository(this.db);
      await updateCoaRepository.handle(id, objClean(coaEntity), options);

      return;
    } catch (error) {
      throw error;
    }
  }
}
