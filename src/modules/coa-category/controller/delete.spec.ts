import request from "supertest";
import CoaCategoryFactory from "../model/coa-category.factory.js";
import { createApp } from "@src/app.js";
import { resetDatabase, retrieve, retrieveAll } from "@src/test/utils.js";

describe("delete a coa category", () => {
  beforeEach(async () => {
    await resetDatabase();
  });
  it("should be able to delete a coa category", async () => {
    const app = await createApp();

    const coaCategoryFactory = new CoaCategoryFactory();
    const resultFactory = await coaCategoryFactory.createMany(3);

    const response = await request(app).delete(`/v1/coa-categories/${resultFactory.insertedIds[1]}`);

    // expect http response
    expect(response.statusCode).toEqual(204);

    // expect response json
    expect(response.body).toStrictEqual({});

    // expect recorded data
    const coaCategoryRecord = await retrieve("coaCategories", resultFactory.insertedIds[1]);
    expect(coaCategoryRecord).toBeNull();

    const coaCategoryRecords = await retrieveAll("coaCategories");
    expect(coaCategoryRecords.length).toStrictEqual(2);
  });
});
