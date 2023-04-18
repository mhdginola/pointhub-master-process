import { objClean } from "@point-hub/express-utils";
import { CoaCategoryEntity } from "../model/coa-category.entity.js";
import { CreateCoaCategoriesRepository } from "../model/repository/create.repository.js";
import { validate } from "../validation/create.validation.js";
import DatabaseConnection, { CreateOptionsInterface, DocumentInterface } from "@src/database/connection.js";

export class CreateCoaCategoryUseCase {
  private db: DatabaseConnection;

  constructor(db: DatabaseConnection) {
    this.db = db;
  }

  public async handle(document: DocumentInterface, options: CreateOptionsInterface) {
    try {
      // validate request body
      validate(document);

      // save to database
      const coaCategoryEntity = objClean(
        new CoaCategoryEntity({
          name: document.name,
          createdAt: new Date(),
        })
      );

      const response = await new CreateCoaCategoriesRepository(this.db).handle(coaCategoryEntity, options);

      return {
        acknowledged: response.acknowledged,
        _id: response._id,
      };
    } catch (error) {
      throw error;
    }
  }
}
