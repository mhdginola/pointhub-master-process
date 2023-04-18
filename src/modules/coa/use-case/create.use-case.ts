import { objClean } from "@point-hub/express-utils";
import { CoaEntity } from "../model/coa.entity.js";
import { CreateCoaRepository } from "../model/repository/create.repository.js";
import { validate } from "../validation/create.validation.js";
import DatabaseConnection, { CreateOptionsInterface, DocumentInterface } from "@src/database/connection.js";

export class CreateCoaUseCase {
  private db: DatabaseConnection;

  constructor(db: DatabaseConnection) {
    this.db = db;
  }

  public async handle(document: DocumentInterface, options: CreateOptionsInterface) {
    try {
      // validate request body
      validate(document);

      // save to database
      const coaEntity = objClean(
        new CoaEntity({
          number: document.number,
          name: document.name,
          category_id: document.category_id,
          group_id: document.group_id,
          type_id: document.type_id,
          subledger: document.subledger,
          position: document.position,
          createdAt: new Date(),
        })
      );

      const response = await new CreateCoaRepository(this.db).handle(coaEntity, options);

      return {
        acknowledged: response.acknowledged,
        _id: response._id,
      };
    } catch (error) {
      throw error;
    }
  }
}
