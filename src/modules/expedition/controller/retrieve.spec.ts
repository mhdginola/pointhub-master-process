import { isValid } from "date-fns";
import request from "supertest";
import ExpeditionFactory from "../model/expedition.factory.js";
import { createApp } from "@src/app.js";
import { resetDatabase, retrieveAll } from "@src/test/utils.js";

describe("retrieve an expedition", () => {
  beforeEach(async () => {
    await resetDatabase();
  });
  it("should be able to retrieve an expedition", async () => {
    const app = await createApp();

    const expeditionFactory = new ExpeditionFactory();
    const resultFactory = await expeditionFactory.createMany(3);
    const data = await retrieveAll("expeditions");

    const response = await request(app).get(`/v1/expeditions/${resultFactory.insertedIds[1]}`);

    // expect http response
    expect(response.statusCode).toEqual(200);

    // expect response json
    expect(response.body._id).toBeDefined();
    expect(response.body.code).toStrictEqual(data[1].code);
    expect(response.body.name).toStrictEqual(data[1].name);
    expect(response.body.address).toStrictEqual(data[1].address);
    expect(response.body.phone).toStrictEqual(data[1].phone);
    expect(response.body.email).toStrictEqual(data[1].email);
    expect(response.body.contactPerson).toStrictEqual(data[1].contactPerson);
    expect(response.body.bank.name).toStrictEqual(data[1].bank.name);
    expect(response.body.bank.branch).toStrictEqual(data[1].bank.branch);
    expect(response.body.bank.accountNumber).toStrictEqual(data[1].bank.accountNumber);
    expect(isValid(new Date(response.body.createdAt))).toBeTruthy();
  });
});
