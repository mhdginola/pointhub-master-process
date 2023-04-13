import { faker } from "@faker-js/faker";
import { isValid } from "date-fns";
import request from "supertest";
import CoaCategoryFactory from "../../coa-category/model/coa-category.factory.js";
import CoaGroupFactory from "../../coa-group/model/coa-group.factory.js";
import CoaTypeFactory from "../../coa-type/model/coa-type.factory.js";
import { SubledgerTypes, PositionTypes } from "../model/coa.entity.js";
import { createApp } from "@src/app.js";
import { resetDatabase, retrieve } from "@src/test/utils.js";

describe("create an coa", () => {
  beforeEach(async () => {
    await resetDatabase();
  });
  it("should be able to create an coa", async () => {
    const app = await createApp();

    const coaTypeFactory = new CoaTypeFactory();
    const coaTypeResult = await coaTypeFactory.create();

    const coaCategoryFactory = new CoaCategoryFactory();
    const coaCategoryResult = await coaCategoryFactory.create();

    const coaGroupFactory = new CoaGroupFactory();
    const coaGroupResult = await coaGroupFactory.create();

    const data = {
      number: faker.datatype.uuid(),
      name: faker.random.alpha(),
      type_id: coaTypeResult._id,
      category_id: coaCategoryResult._id,
      group_id: coaGroupResult._id,
      subledger: SubledgerTypes.Item,
      position: PositionTypes.Debit,
    };

    const response = await request(app).post("/v1/coas").send(data);

    // expect http response
    expect(response.statusCode).toEqual(201);

    // expect response json
    expect(response.body._id).toBeDefined();

    // expect recorded data
    const coaRecord = await retrieve("coas", response.body._id);

    expect(coaRecord._id).toStrictEqual(response.body._id);
    expect(coaRecord.number).toStrictEqual(data.number);
    expect(coaRecord.name).toStrictEqual(data.name);
    expect(coaRecord.type_id).toStrictEqual(data.type_id);
    expect(coaRecord.category_id).toStrictEqual(data.category_id);
    expect(coaRecord.group_id).toStrictEqual(data.group_id);
    expect(coaRecord.subledger).toStrictEqual(data.subledger);
    expect(coaRecord.position).toStrictEqual(data.position);
    expect(isValid(new Date(coaRecord.createdAt))).toBeTruthy();
  });
});
