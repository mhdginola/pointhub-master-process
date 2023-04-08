import { faker } from "@faker-js/faker";
import Factory from "@point-hub/express-factory";
import { ProcessEntityInterface, ProcessStatusTypes } from "./process.entity.js";
import { CreateManyProcessesRepository } from "./repository/create-many.repository.js";
import { CreateProcessesRepository } from "./repository/create.repository.js";
import { db } from "@src/database/database.js";

export default class ProcessFactory extends Factory<ProcessEntityInterface> {
  definition() {
    return {
      name: faker.name.fullName(),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      status: ProcessStatusTypes.Active,
      createdAt: new Date(),
      isArchive: false,
    };
  }

  async create() {
    const processesRepository = new CreateProcessesRepository(db);
    return await processesRepository.handle(this.makeOne());
  }

  async createMany(count: number) {
    const processesRepository = new CreateManyProcessesRepository(db);
    return await processesRepository.handle(this.makeMany(count));
  }
}
