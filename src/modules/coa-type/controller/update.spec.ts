import { faker } from "@faker-js/faker";
import { isValid } from "date-fns";
import request from "supertest";
import CoaTypeFactory from "../model/coa-type.factory.js";
import { createApp } from "@src/app.js";
import { resetDatabase, retrieve, retrieveAll } from "@src/test/utils.js";

describe("update a coa type", () => {
  beforeEach(async () => {
    await resetDatabase();
  });
  it("should be able to update a coa type", async () => {
    const app = await createApp();

    const resultFactory = await new CoaTypeFactory().createMany(3);

    const data = await retrieveAll("coaTypes");

    const updateData = {
      name: faker.name.fullName(),
    };

    const response = await request(app).patch(`/v1/coa-types/${resultFactory.insertedIds[1]}`).send(updateData);

    // expect http response
    expect(response.statusCode).toEqual(204);

    // expect response json
    expect(response.body).toStrictEqual({});

    // expect recorded data
    const coaTypeRecord = await retrieve("coaTypes", resultFactory.insertedIds[1]);
    expect(coaTypeRecord.name).toStrictEqual(updateData.name);
    expect(isValid(new Date(coaTypeRecord.updatedAt))).toBeTruthy();

    // expect another data unmodified
    const unmodifiedCoaTypeRecord = await retrieve("coaTypes", resultFactory.insertedIds[0]);
    expect(unmodifiedCoaTypeRecord.name).toStrictEqual(data[0].name);
    expect(unmodifiedCoaTypeRecord.updatedAt).toBeUndefined();
  });
});
