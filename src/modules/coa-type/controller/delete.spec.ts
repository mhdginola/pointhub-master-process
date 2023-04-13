import request from "supertest";
import CoaTypeFactory from "../model/coa-type.factory.js";
import { createApp } from "@src/app.js";
import { resetDatabase, retrieve, retrieveAll } from "@src/test/utils.js";

describe("delete a coa type", () => {
  beforeEach(async () => {
    await resetDatabase();
  });
  it("should be able to delete a coa type", async () => {
    const app = await createApp();

    const coaTypeFactory = new CoaTypeFactory();
    const resultFactory = await coaTypeFactory.createMany(3);

    const response = await request(app).delete(`/v1/coa-types/${resultFactory.insertedIds[1]}`);

    // expect http response
    expect(response.statusCode).toEqual(204);

    // expect response json
    expect(response.body).toStrictEqual({});

    // expect recorded data
    const coaTypeRecord = await retrieve("coaTypes", resultFactory.insertedIds[1]);
    expect(coaTypeRecord).toBeNull();

    const coaTypeRecords = await retrieveAll("coaTypes");
    expect(coaTypeRecords.length).toStrictEqual(2);
  });
});
