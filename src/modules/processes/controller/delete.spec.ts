import request from "supertest";
import ProcessFactory from "../model/process.factory.js";
import { createApp } from "@src/app.js";
import { resetDatabase, retrieve, retrieveAll } from "@src/test/utils.js";

describe("delete an process", () => {
  beforeEach(async () => {
    await resetDatabase();
  });
  it("should be able to delete an process", async () => {
    const app = await createApp();

    const processFactory = new ProcessFactory();
    const resultFactory = await processFactory.createMany(3);

    const response = await request(app).delete(`/v1/processes/${resultFactory.insertedIds[1]}`);

    // expect http response
    expect(response.statusCode).toEqual(204);

    // expect response json
    expect(response.body).toStrictEqual({});

    // expect recorded data
    const processRecord = await retrieve("processes", resultFactory.insertedIds[1]);
    expect(processRecord).toBeNull();

    const processRecords = await retrieveAll("processes");
    expect(processRecords.length).toStrictEqual(2);
  });
});
