import { faker } from "@faker-js/faker";
import Factory from "@point-hub/express-factory";
import { CoaGroupsEntityInterface } from "./coa-groups.entity.js";
import { CreateManyCoaGroupsRepository } from "./repository/create-many.repository.js";
import { CreateCoaGroupsRepository } from "./repository/create.repository.js";
import { db } from "@src/database/database.js";

export default class CoaGroupsFactory extends Factory<CoaGroupsEntityInterface> {
  definition() {
    return {
      name: faker.name.fullName(),
      createdAt: new Date(),
    };
  }

  async create() {
    const session = db.startSession();

    db.startTransaction();
    const coaGroupsRepository = new CreateCoaGroupsRepository(db);
    return await coaGroupsRepository.handle(this.makeOne(), { session });

    await db.commitTransaction();
    await db.endSession();
  }

  async createMany(count: number) {
    const coaGroupsRepository = new CreateManyCoaGroupsRepository(db);
    return await coaGroupsRepository.handle(this.makeMany(count));
  }
}
