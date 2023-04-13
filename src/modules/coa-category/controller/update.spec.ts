import { faker } from "@faker-js/faker";
import { isValid } from "date-fns";
import request from "supertest";
import CoaCategoryFactory from "../model/coa-category.factory.js";
import { createApp } from "@src/app.js";
import { resetDatabase, retrieve, retrieveAll } from "@src/test/utils.js";

describe("update a coa category", () => {
  beforeEach(async () => {
    await resetDatabase();
  });
  it("should be able to update a coa category", async () => {
    const app = await createApp();

    const resultFactory = await new CoaCategoryFactory().createMany(3);

    const data = await retrieveAll("coaCategories");

    const updateData = {
      name: faker.name.fullName(),
    };

    const response = await request(app).patch(`/v1/coa-categories/${resultFactory.insertedIds[1]}`).send(updateData);

    // expect http response
    expect(response.statusCode).toEqual(204);

    // expect response json
    expect(response.body).toStrictEqual({});

    // expect recorded data
    const coaCategoryRecord = await retrieve("coaCategories", resultFactory.insertedIds[1]);
    expect(coaCategoryRecord.name).toStrictEqual(updateData.name);
    expect(isValid(new Date(coaCategoryRecord.updatedAt))).toBeTruthy();

    // expect another data unmodified
    const unmodifiedCoaCategoryRecord = await retrieve("coaCategories", resultFactory.insertedIds[0]);
    expect(unmodifiedCoaCategoryRecord.name).toStrictEqual(data[0].name);
    expect(unmodifiedCoaCategoryRecord.updatedAt).toBeUndefined();
  });
});
