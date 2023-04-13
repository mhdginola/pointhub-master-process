import { isValid } from "date-fns";
import request from "supertest";
import { CoaStatusTypes } from "../model/coa.entity.js";
import CoaFactory from "../model/coa.factory.js";
import { createApp } from "@src/app.js";
import { resetDatabase, retrieveAll } from "@src/test/utils.js";

describe("retrieve an coa", () => {
  beforeEach(async () => {
    await resetDatabase();
  });
  it("should be able to retrieve an coa", async () => {
    const app = await createApp();

    const coaFactory = new CoaFactory();
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
