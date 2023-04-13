import { faker } from "@faker-js/faker";
import { isValid } from "date-fns";
import request from "supertest";
import { createApp } from "@src/app.js";
import { resetDatabase, retrieve } from "@src/test/utils.js";

describe("create an expedition", () => {
  beforeEach(async () => {
    await resetDatabase();
  });
  it("should be able to create an expedition", async () => {
    const app = await createApp();

    const data = {
      name: faker.name.fullName(),
    };

    const response = await request(app).post("/v1/expeditions").send(data);

    // expect http response
    expect(response.statusCode).toEqual(201);

    // expect response json
    expect(response.body._id).toBeDefined();

    // expect recorded data
    const expeditionRecord = await retrieve("expeditions", response.body._id);

    expect(expeditionRecord._id).toStrictEqual(response.body._id);
    expect(expeditionRecord.code).toStrictEqual(data.code);
    expect(expeditionRecord.name).toStrictEqual(data.name);
    expect(expeditionRecord.address).toStrictEqual(data.address);
    expect(expeditionRecord.phone).toStrictEqual(data.phone);
    expect(expeditionRecord.email).toStrictEqual(data.email);
    expect(expeditionRecord.contactPerson).toStrictEqual(data.contactPerson);
    expect(expeditionRecord.bank.name).toStrictEqual(data.bank.name);
    expect(expeditionRecord.bank.branch).toStrictEqual(data.bank.branch);
    expect(expeditionRecord.bank.accountNumber).toStrictEqual(data.bank.accountNumber);
    expect(isValid(new Date(expeditionRecord.createdAt))).toBeTruthy();
  });
});
