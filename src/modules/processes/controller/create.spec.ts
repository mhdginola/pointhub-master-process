import { faker } from "@faker-js/faker";
import { isValid } from "date-fns";
import request from "supertest";
import { ProcessStatusTypes } from "../model/process.entity.js";
import { createApp } from "@src/app.js";
import { resetDatabase, retrieve } from "@src/test/utils.js";

describe("create an process", () => {
  beforeEach(async () => {
    await resetDatabase();
  });
  it("should be able to create an process", async () => {
    const app = await createApp();

    const data = {
      name: faker.name.fullName(),
    };

    const response = await request(app).post("/v1/processes").send(data);

    // expect http response
    expect(response.statusCode).toEqual(201);

    // expect response json
    expect(response.body._id).toBeDefined();

    // expect recorded data
    const processRecord = await retrieve("processes", response.body._id);

    expect(processRecord._id).toStrictEqual(response.body._id);
    expect(processRecord.name).toStrictEqual(data.name);
    expect(processRecord.status).toStrictEqual(ProcessStatusTypes.Active);
    expect(isValid(new Date(processRecord.createdAt))).toBeTruthy();
  });
});
