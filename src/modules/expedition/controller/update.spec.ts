import { faker } from "@faker-js/faker";
import { isValid } from "date-fns";
import request from "supertest";
import ExpeditionFactory from "../model/expedition.factory.js";
import { createApp } from "@src/app.js";
import { resetDatabase, retrieve, retrieveAll } from "@src/test/utils.js";

describe("update an expedition", () => {
  beforeEach(async () => {
    await resetDatabase();
  });
  it("should be able to update an expedition", async () => {
    const app = await createApp();

    const resultFactory = await new ExpeditionFactory().createMany(3);

    const data = await retrieveAll("expeditions");

    const updateData = {
      name: faker.name.fullName(),
    };

    const response = await request(app).patch(`/v1/expeditions/${resultFactory.insertedIds[1]}`).send(updateData);

    // expect http response
    expect(response.statusCode).toEqual(204);

    // expect response json
    expect(response.body).toStrictEqual({});

    // expect recorded data
    const expeditionRecord = await retrieve("expeditions", resultFactory.insertedIds[1]);
    expect(expeditionRecord.name).toStrictEqual(updateData.name);
    expect(isValid(new Date(expeditionRecord.updatedAt))).toBeTruthy();

    // expect another data unmodified
    const unmodifiedExpeditionRecord = await retrieve("expeditions", resultFactory.insertedIds[0]);
    expect(unmodifiedExpeditionRecord.name).toStrictEqual(data[0].name);
    expect(unmodifiedExpeditionRecord.updatedAt).toBeUndefined();
  });
});
