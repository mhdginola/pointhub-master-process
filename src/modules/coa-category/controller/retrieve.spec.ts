import { isValid } from "date-fns";
import request from "supertest";
import CoaCategoryFactory from "../model/coa-category.factory.js";
import { createApp } from "@src/app.js";
import { resetDatabase, retrieveAll } from "@src/test/utils.js";

describe("retrieve a coa category", () => {
  beforeEach(async () => {
    await resetDatabase();
  });
  it("should be able to retrieve a coa category", async () => {
    const app = await createApp();

    const coaCategoryFactory = new CoaCategoryFactory();
    const resultFactory = await coaCategoryFactory.createMany(3);
    const data = await retrieveAll("coaCategories");

    const response = await request(app).get(`/v1/coa-categories/${resultFactory.insertedIds[1]}`);

    // expect http response
    expect(response.statusCode).toEqual(200);

    // expect response json
    expect(response.body._id).toBeDefined();
    expect(response.body.name).toStrictEqual(data[1].name);
    expect(isValid(new Date(response.body.createdAt))).toBeTruthy();
  });
});
