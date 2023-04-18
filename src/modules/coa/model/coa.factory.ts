import { faker } from "@faker-js/faker";
import Factory from "@point-hub/express-factory";
import { CoaEntityInterface, SubledgerTypes, PositionTypes } from "./coa.entity.js";
import { CreateManyCoaRepository } from "./repository/create-many.repository.js";
import { CreateCoaRepository } from "./repository/create.repository.js";
import { db } from "@src/database/database.js";

export default class CoaFactory extends Factory<CoaEntityInterface> {
  definition() {
    return {
      number: faker.datatype.number(),
      name: faker.name.fullName(),
      category_id: faker.datatype.uuid(),
      type_id: faker.datatype.uuid(),
      group_id: faker.datatype.uuid(),
      subledger: SubledgerTypes.Item,
      position: PositionTypes.Debit,
      createdAt: new Date(),
    };
  }

  async create() {
    const coaRepository = new CreateCoaRepository(db);
    return await coaRepository.handle(this.makeOne());
  }

  async createMany(count: number) {
    const coaRepository = new CreateManyCoaRepository(db);
    return await coaRepository.handle(this.makeMany(count));
  }
}
