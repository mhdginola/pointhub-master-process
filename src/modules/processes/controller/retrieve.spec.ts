import { isValid } from "date-fns";
import request from "supertest";
import { ProcessStatusTypes } from "../model/process.entity.js";
import ProcessFactory from "../model/process.factory.js";
import { createApp } from "@src/app.js";
import { resetDatabase, retrieveAll } from "@src/test/utils.js";

describe("retrieve an process", () => {
  beforeEach(async () => {
    await resetDatabase();
  });
  it("should be able to retrieve an process", async () => {
    const app = await createApp();

    const processFactory = new ProcessFactory();
    const resultFactory = await processFactory.createMany(3);
    const data = await retrieveAll("processes");

    const response = await request(app).get(`/v1/processes/${resultFactory.insertedIds[1]}`);

    // expect http response
    expect(response.statusCode).toEqual(200);

    // expect response json
    expect(response.body._id).toBeDefined();
    expect(response.body.name).toStrictEqual(data[1].name);
    expect(response.body.isArchive).toStrictEqual(false);
    expect(isValid(new Date(response.body.createdAt))).toBeTruthy();
  });
});
