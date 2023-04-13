import request from "supertest";
import ExpeditionFactory from "../model/expedition.factory.js";
import { createApp } from "@src/app.js";
import { resetDatabase, retrieve, retrieveAll } from "@src/test/utils.js";

describe("delete an expedition", () => {
  beforeEach(async () => {
    await resetDatabase();
  });
  it("should be able to delete an expedition", async () => {
    const app = await createApp();

    const expeditionFactory = new ExpeditionFactory();
    const resultFactory = await expeditionFactory.createMany(3);

    const response = await request(app).delete(`/v1/expeditions/${resultFactory.insertedIds[1]}`);

    // expect http response
    expect(response.statusCode).toEqual(204);

    // expect response json
    expect(response.body).toStrictEqual({});

    // expect recorded data
    const expeditionRecord = await retrieve("expeditions", resultFactory.insertedIds[1]);
    expect(expeditionRecord).toBeNull();

    const expeditionRecords = await retrieveAll("expeditions");
    expect(expeditionRecords.length).toStrictEqual(2);
  });
});
