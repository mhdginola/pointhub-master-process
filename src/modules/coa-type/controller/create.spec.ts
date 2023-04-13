import { faker } from "@faker-js/faker";
import { isValid } from "date-fns";
import request from "supertest";
import { createApp } from "@src/app.js";
import { resetDatabase, retrieve } from "@src/test/utils.js";

describe("create a coa type", () => {
  beforeEach(async () => {
    await resetDatabase();
  });
  it("should be able to create a coa type", async () => {
    const app = await createApp();

    const data = {
      name: faker.name.fullName(),
    };

    const response = await request(app).post("/v1/coa-types").send(data);

    // expect http response
    expect(response.statusCode).toEqual(201);

    // expect response json
    expect(response.body._id).toBeDefined();

    // expect recorded data
    const coaTypeRecord = await retrieve("coaTypes", response.body._id);

    expect(coaTypeRecord._id).toStrictEqual(response.body._id);
    expect(coaTypeRecord.name).toStrictEqual(data.name);
    expect(isValid(new Date(coaTypeRecord.createdAt))).toBeTruthy();
  });
});
