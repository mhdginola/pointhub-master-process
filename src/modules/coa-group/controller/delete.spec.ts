import request from "supertest";
import CoaGroupFactory from "../model/coa-group.factory.js";
import { createApp } from "@src/app.js";
import { resetDatabase, retrieve, retrieveAll } from "@src/test/utils.js";

describe("delete a coa group", () => {
  beforeEach(async () => {
    await resetDatabase();
  });
  it("should be able to delete a coa group", async () => {
    const app = await createApp();

    const coaGroupFactory = new CoaGroupFactory();
    const resultFactory = await coaGroupFactory.createMany(3);

    const response = await request(app).delete(`/v1/coa-groups/${resultFactory.insertedIds[1]}`);

    // expect http response
    expect(response.statusCode).toEqual(204);

    // expect response json
    expect(response.body).toStrictEqual({});

    // expect recorded data
    const coaGroupRecord = await retrieve("coaGroups", resultFactory.insertedIds[1]);
    expect(coaGroupRecord).toBeNull();

    const coaGroupRecords = await retrieveAll("coaGroups");
    expect(coaGroupRecords.length).toStrictEqual(2);
  });
});
