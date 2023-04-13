import { isValid } from "date-fns";
import request from "supertest";
import CoaTypeFactory from "../model/coa-type.factory.js";
import { createApp } from "@src/app.js";
import { resetDatabase, retrieveAll } from "@src/test/utils.js";

describe("retrieve a coa type", () => {
  beforeEach(async () => {
    await resetDatabase();
  });
  it("should be able to retrieve a coa type", async () => {
    const app = await createApp();

    const coaTypeFactory = new CoaTypeFactory();
    const resultFactory = await coaTypeFactory.createMany(3);
    const data = await retrieveAll("coaTypes");

    const response = await request(app).get(`/v1/coa-types/${resultFactory.insertedIds[1]}`);

    // expect http response
    expect(response.statusCode).toEqual(200);

    // expect response json
    expect(response.body._id).toBeDefined();
    expect(response.body.name).toStrictEqual(data[1].name);
    expect(isValid(new Date(response.body.createdAt))).toBeTruthy();
  });
});
