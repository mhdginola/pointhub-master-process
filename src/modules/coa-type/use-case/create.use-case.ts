import { objClean } from "@point-hub/express-utils";
import { CoaTypesEntity } from "../model/coa-types.entity.js";
import { CreateCoaTypesRepository } from "../model/repository/create.repository.js";
import { validate } from "../validation/create.validation.js";
import DatabaseConnection, { CreateOptionsInterface, DocumentInterface } from "@src/database/connection.js";

export class CreateCoaTypesUseCase {
  private db: DatabaseConnection;

  constructor(db: DatabaseConnection) {
    this.db = db;
  }

  public async handle(document: DocumentInterface, options: CreateOptionsInterface) {
    try {
      // validate request body
      validate(document);

      // save to database
      const coaTypesEntity = objClean(
        new CoaTypesEntity({
          name: document.name,
          createdAt: new Date(),
        })
      );

      const response = await new CreateCoaTypesRepository(this.db).handle(coaTypesEntity, options);

      return {
        acknowledged: response.acknowledged,
        _id: response._id,
      };
    } catch (error) {
      throw error;
    }
  }
}
