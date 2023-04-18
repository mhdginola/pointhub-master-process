import { isValid } from "date-fns";
import request from "supertest";
import { CoaStatusTypes } from "../model/coa.entity.js";
import CoaFactory from "../model/coa.factory.js";
import { createApp } from "@src/app.js";
import CoaCategoryFactory from "@src/modules/coa-category/model/coa-category.factory.js";
import CoaGroupsFactory from "@src/modules/coa-group/model/coa-group.factory.js";
import CoaTypeFactory from "@src/modules/coa-type/model/coa-type.factory.js";
import { resetDatabase, retrieveAll } from "@src/test/utils.js";

describe("retrieve an coa", () => {
  beforeEach(async () => {
    await resetDatabase();
  });
  it("should be able to retrieve an coa", async () => {
    const app = await createApp();

    const coaTypeFactory = new CoaTypeFactory();
    const coaTypeResult = await coaTypeFactory.createMany(3);

    const coaCategoryFactory = new CoaCategoryFactory();
    const coaCategoryResult = await coaCategoryFactory.createMany(3);

    const coaGroupFactory = new CoaGroupsFactory();
    const coaGroupResult = await coaGroupFactory.createMany(3);

    const coaFactory = new CoaFactory();
    const customCoa = [
      {
        category_id: coaCategoryResult.insertedIds[0],
        type_id: coaTypeResult.insertedIds[0],
        group_id: coaGroupResult.insertedIds[0],
      },
      {
        category_id: coaCategoryResult.insertedIds[1],
        type_id: coaTypeResult.insertedIds[1],
        group_id: coaGroupResult.insertedIds[1],
      },
      {
        category_id: coaCategoryResult.insertedIds[2],
        type_id: coaTypeResult.insertedIds[2],
        group_id: coaGroupResult.insertedIds[2],
      },
    ];
    coaFactory.sequence(customCoa);
    const resultFactory = await coaFactory.createMany(3);
    const data = await retrieveAll("coas");

    const response = await request(app).get(`/v1/coas/${resultFactory.insertedIds[1]}`);

    // expect http response
    expect(response.statusCode).toEqual(200);

    // expect response json
    expect(response.body._id).toBeDefined();
    expect(response.body.number).toStrictEqual(data[1].number);
    expect(response.body.name).toStrictEqual(data[1].name);
    expect(response.body.type._id).toStrictEqual(data[1].type_id);
    expect(response.body.type.name).not.toBeNull();
    expect(response.body.category._id).toStrictEqual(data[1].category_id);
    expect(response.body.category.name).not.toBeNull();
    expect(response.body.group._id).toStrictEqual(data[1].group_id);
    expect(response.body.group.name).not.toBeNull();
    expect(response.body.subledger).toStrictEqual(data[1].subledger);
    expect(response.body.position).toStrictEqual(data[1].position);
    expect(isValid(new Date(response.body.createdAt))).toBeTruthy();
  });
});
