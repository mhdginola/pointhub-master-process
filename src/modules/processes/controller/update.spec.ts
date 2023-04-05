import { faker } from "@faker-js/faker";
import { isValid } from "date-fns";
import request from "supertest";
import ProcessFactory from "../model/process.factory.js";
import { createApp } from "@src/app.js";
import { resetDatabase, retrieve, retrieveAll } from "@src/test/utils.js";

describe("update an process", () => {
  beforeEach(async () => {
    await resetDatabase();
  });
  it("should be able to update an process", async () => {
    const app = await createApp();

    const resultFactory = await new ProcessFactory().createMany(3);

    const data = await retrieveAll("processes");

    const updateData = {
      name: faker.name.fullName(),
    };

    const response = await request(app).patch(`/v1/processes/${resultFactory.insertedIds[1]}`).send(updateData);

    // expect http response
    expect(response.statusCode).toEqual(204);

    // expect response json
    expect(response.body).toStrictEqual({});

    // expect recorded data
    const processRecord = await retrieve("processes", resultFactory.insertedIds[1]);
    expect(processRecord.name).toStrictEqual(updateData.name);
    expect(isValid(new Date(processRecord.updatedAt))).toBeTruthy();

    // expect another data unmodified
    const unmodifiedProcessRecord = await retrieve("processes", resultFactory.insertedIds[0]);
    expect(unmodifiedProcessRecord.name).toStrictEqual(data[0].name);
    expect(unmodifiedProcessRecord.updatedAt).toBeUndefined();
  });
});
