import { faker } from "@faker-js/faker";
import { isValid } from "date-fns";
import request from "supertest";
import { createApp } from "@src/app.js";
import { resetDatabase, retrieve } from "@src/test/utils.js";

describe("create a coa category", () => {
  beforeEach(async () => {
    await resetDatabase();
  });
  it("should be able to create a coa category", async () => {
    const app = await createApp();

    const data = {
      name: faker.name.fullName(),
    };

    const response = await request(app).post("/v1/coa-categories").send(data);

    // expect http response
    expect(response.statusCode).toEqual(201);

    // expect response json
    expect(response.body._id).toBeDefined();

    // expect recorded data
    const coaCategoryRecord = await retrieve("coaCategories", response.body._id);

    expect(coaCategoryRecord._id).toStrictEqual(response.body._id);
    expect(coaCategoryRecord.name).toStrictEqual(data.name);
    expect(isValid(new Date(coaCategoryRecord.createdAt))).toBeTruthy();
  });
});
