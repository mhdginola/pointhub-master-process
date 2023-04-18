import { faker } from "@faker-js/faker";
import Factory from "@point-hub/express-factory";
import { CoaTypesEntityInterface } from "./coa-types.entity.js";
import { CreateManyCoaTypesRepository } from "./repository/create-many.repository.js";
import { CreateCoaTypesRepository } from "./repository/create.repository.js";
import { db } from "@src/database/database.js";

export default class CoaTypeFactory extends Factory<CoaTypesEntityInterface> {
  definition() {
    return {
      name: faker.name.fullName(),
      createdAt: new Date(),
    };
  }

  async create() {
    const session = db.startSession();

    db.startTransaction();
    const coaTypesRepository = new CreateCoaTypesRepository(db);
    return await coaTypesRepository.handle(this.makeOne(), { session });

    await db.commitTransaction();
    await db.endSession();
  }

  async createMany(count: number) {
    const coaTypesRepository = new CreateManyCoaTypesRepository(db);
    return await coaTypesRepository.handle(this.makeMany(count));
  }
}
