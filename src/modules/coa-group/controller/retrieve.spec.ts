import { isValid } from "date-fns";
import request from "supertest";
import CoaGroupFactory from "../model/coa-group.factory.js";
import { createApp } from "@src/app.js";
import { resetDatabase, retrieveAll } from "@src/test/utils.js";

describe("retrieve a coa group", () => {
  beforeEach(async () => {
    await resetDatabase();
  });
  it("should be able to retrieve a coa group", async () => {
    const app = await createApp();

    const coaGroupFactory = new CoaGroupFactory();
    const resultFactory = await coaGroupFactory.createMany(3);
    const data = await retrieveAll("coaGroups");

    const response = await request(app).get(`/v1/coa-groups/${resultFactory.insertedIds[1]}`);

    // expect http response
    expect(response.statusCode).toEqual(200);

    // expect response json
    expect(response.body._id).toBeDefined();
    expect(response.body.name).toStrictEqual(data[1].name);
    expect(isValid(new Date(response.body.createdAt))).toBeTruthy();
  });
});
