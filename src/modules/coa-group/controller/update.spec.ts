import { faker } from "@faker-js/faker";
import { isValid } from "date-fns";
import request from "supertest";
import CoaGroupFactory from "../model/coa-group.factory.js";
import { createApp } from "@src/app.js";
import { resetDatabase, retrieve, retrieveAll } from "@src/test/utils.js";

describe("update a coa group", () => {
  beforeEach(async () => {
    await resetDatabase();
  });
  it("should be able to update a coa group", async () => {
    const app = await createApp();

    const resultFactory = await new CoaGroupFactory().createMany(3);

    const data = await retrieveAll("coaGroups");

    const updateData = {
      name: faker.name.fullName(),
    };

    const response = await request(app).patch(`/v1/coa-groups/${resultFactory.insertedIds[1]}`).send(updateData);

    // expect http response
    expect(response.statusCode).toEqual(204);

    // expect response json
    expect(response.body).toStrictEqual({});

    // expect recorded data
    const coaGroupRecord = await retrieve("coaGroups", resultFactory.insertedIds[1]);
    expect(coaGroupRecord.name).toStrictEqual(updateData.name);
    expect(isValid(new Date(coaGroupRecord.updatedAt))).toBeTruthy();

    // expect another data unmodified
    const unmodifiedCoaGroupRecord = await retrieve("coaGroups", resultFactory.insertedIds[0]);
    expect(unmodifiedCoaGroupRecord.name).toStrictEqual(data[0].name);
    expect(unmodifiedCoaGroupRecord.updatedAt).toBeUndefined();
  });
});
