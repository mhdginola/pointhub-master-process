import { objClean } from "@point-hub/express-utils";
import { CoaCategoryEntity } from "../model/coa-category.entity.js";
import { UpdateCoaCategoriesRepository } from "../model/repository/update.repository.js";
import { validate } from "../validation/update.validation.js";
import DatabaseConnection, { UpdateOptionsInterface, DocumentInterface } from "@src/database/connection.js";

export class UpdateCoaCategoriesUseCase {
  private db: DatabaseConnection;

  constructor(db: DatabaseConnection) {
    this.db = db;
  }

  public async handle(id: string, document: DocumentInterface, options: UpdateOptionsInterface) {
    try {
      // validate request body
      validate(document);

      // update database
      const coaCategoryEntity = new CoaCategoryEntity({
        name: document.name,
        updatedAt: new Date(),
      });

      const updateCoaCategoriesRepository = new UpdateCoaCategoriesRepository(this.db);
      await updateCoaCategoriesRepository.handle(id, objClean(coaCategoryEntity), options);

      return;
    } catch (error) {
      throw error;
    }
  }
}
