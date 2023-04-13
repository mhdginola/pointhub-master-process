import { faker } from "@faker-js/faker";
import { isValid } from "date-fns";
import request from "supertest";
import CoaCategoryFactory from "../../coa-category/model/coa-category.factory.js";
import CoaGroupFactory from "../../coa-group/model/coa-group.factory.js";
import CoaTypeFactory from "../../coa-type/model/coa-type.factory.js";
import { SubledgerTypes, PositionTypes } from "../model/coa.entity.js";
import CoaFactory from "../model/coa.factory.js";
import { createApp } from "@src/app.js";
import { resetDatabase, retrieve, retrieveAll } from "@src/test/utils.js";

describe("update an coa", () => {
  beforeEach(async () => {
    await resetDatabase();
  });
  it("should be able to update an coa", async () => {
    const app = await createApp();

    const resultFactory = await new CoaFactory().createMany(3);

    const data = await retrieveAll("coas");

    const coaTypeFactory = new CoaTypeFactory();
    const coaTypeResult = await coaTypeFactory.create();

    const coaCategoryFactory = new CoaCategoryFactory();
    const coaCategoryResult = await coaCategoryFactory.create();

    const coaGroupFactory = new CoaGroupFactory();
    const coaGroupResult = await coaGroupFactory.create();

    const updateData = {
      number: faker.datatype.uuid(),
      name: faker.random.alpha(),
      type_id: coaTypeResult._id,
      category_id: coaCategoryResult._id,
      group_id: coaGroupResult._id,
      subledger: SubledgerTypes.Item,
      position: PositionTypes.Debit,
    };

    const response = await request(app).patch(`/v1/coas/${resultFactory.insertedIds[1]}`).send(updateData);

    // expect http response
    expect(response.statusCode).toEqual(204);

    // expect response json
    expect(response.body).toStrictEqual({});

    // expect recorded data
    const coaRecord = await retrieve("coas", resultFactory.insertedIds[1]);
    expect(coaRecord.number).toStrictEqual(updateData.number);
    expect(coaRecord.name).toStrictEqual(updateData.name);
    expect(coaRecord.type_id).toStrictEqual(updateData.type_id);
    expect(coaRecord.category_id).toStrictEqual(updateData.category_id);
    expect(coaRecord.group_id).toStrictEqual(updateData.group_id);
    expect(coaRecord.subledger).toStrictEqual(updateData.subledger);
    expect(coaRecord.position).toStrictEqual(updateData.position);
    expect(isValid(new Date(coaRecord.updatedAt))).toBeTruthy();

    // expect another data unmodified
    const unmodifiedCoaRecord = await retrieve("coas", resultFactory.insertedIds[0]);
    expect(unmodifiedCoaRecord.name).toStrictEqual(data[0].name);
    expect(unmodifiedCoaRecord.updatedAt).toBeUndefined();
  });
});
