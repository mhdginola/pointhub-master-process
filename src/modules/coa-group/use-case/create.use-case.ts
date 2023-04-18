import { objClean } from "@point-hub/express-utils";
import { CoaGroupsEntity } from "../model/coa-groups.entity.js";
import { CreateCoaGroupsRepository } from "../model/repository/create.repository.js";
import { validate } from "../validation/create.validation.js";
import DatabaseConnection, { CreateOptionsInterface, DocumentInterface } from "@src/database/connection.js";

export class CreateCoaGroupsUseCase {
  private db: DatabaseConnection;

  constructor(db: DatabaseConnection) {
    this.db = db;
  }

  public async handle(document: DocumentInterface, options: CreateOptionsInterface) {
    try {
      // validate request body
      validate(document);

      // save to database
      const coaGroupsEntity = objClean(
        new CoaGroupsEntity({
          name: document.name,
          createdAt: new Date(),
        })
      );

      const response = await new CreateCoaGroupsRepository(this.db).handle(coaGroupsEntity, options);

      return {
        acknowledged: response.acknowledged,
        _id: response._id,
      };
    } catch (error) {
      throw error;
    }
  }
}
