import { faker } from "@faker-js/faker";
import Factory from "@point-hub/express-factory";
import { CoaCategoryEntityInterface } from "./coa-category.entity.js";
import { CreateManyCoaCategoriesRepository } from "./repository/create-many.repository.js";
import { CreateCoaCategoriesRepository } from "./repository/create.repository.js";
import { db } from "@src/database/database.js";

export default class CoaCategoryFactory extends Factory<CoaCategoryEntityInterface> {
  definition() {
    return {
      name: faker.name.fullName(),
      createdAt: new Date(),
    };
  }

  async create() {
    const session = db.startSession();

    db.startTransaction();
    const coaCategoriesRepository = new CreateCoaCategoriesRepository(db);
    return await coaCategoriesRepository.handle(this.makeOne(), { session });

    await db.commitTransaction();
    await db.endSession();
  }

  async createMany(count: number) {
    const coaCategoriesRepository = new CreateManyCoaCategoriesRepository(db);
    return await coaCategoriesRepository.handle(this.makeMany(count));
  }
}
