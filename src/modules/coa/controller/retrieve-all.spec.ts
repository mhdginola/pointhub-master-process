import { isValid } from "date-fns";
import request from "supertest";
import CoaFactory from "../model/coa.factory.js";
import { createApp } from "@src/app.js";
import CoaCategoryFactory from "@src/modules/coa-category/model/coa-category.factory.js";
import CoaGroupsFactory from "@src/modules/coa-group/model/coa-group.factory.js";
import CoaTypeFactory from "@src/modules/coa-type/model/coa-type.factory.js";
import { resetDatabase, retrieveAll } from "@src/test/utils.js";

describe("retrieve all coas", () => {
  beforeEach(async () => {
    await resetDatabase();
  });
  it("should be able to sort data in ascending order", async () => {
    const app = await createApp();

    const coaFactory = new CoaFactory();
    const data = [
      {
        name: "Coa C",
      },
      {
        name: "Coa A",
      },
      {
        name: "Coa B",
      },
    ];
    coaFactory.sequence(data);
    await coaFactory.createMany(3);

    const response = await request(app).get(`/v1/coas`).query({
      sort: "name",
    });

    // expect http response
    expect(response.statusCode).toEqual(200);

    // expect response json
    expect(response.body.coas.length).toStrictEqual(3);
    expect(response.body.coas[0].name).toStrictEqual(data[1].name);
    expect(response.body.coas[1].name).toStrictEqual(data[2].name);
    expect(response.body.coas[2].name).toStrictEqual(data[0].name);

    expect(response.body.pagination.page).toStrictEqual(1);
    expect(response.body.pagination.pageSize).toStrictEqual(10);
    expect(response.body.pagination.pageCount).toStrictEqual(1);
    expect(response.body.pagination.totalDocument).toStrictEqual(3);
  });
  it("should be able to sort data in descending order", async () => {
    const app = await createApp();

    const coaFactory = new CoaFactory();
    const data = [
      {
        name: "Coa C",
      },
      {
        name: "Coa A",
      },
      {
        name: "Coa B",
      },
    ];
    coaFactory.sequence(data);
    await coaFactory.createMany(3);

    const response = await request(app).get(`/v1/coas`).query({
      sort: "-name",
    });

    // expect http response
    expect(response.statusCode).toEqual(200);

    // expect response json
    expect(response.body.coas.length).toStrictEqual(3);
    expect(response.body.coas[0].name).toStrictEqual(data[0].name);
    expect(response.body.coas[1].name).toStrictEqual(data[2].name);
    expect(response.body.coas[2].name).toStrictEqual(data[1].name);

    expect(response.body.pagination.page).toStrictEqual(1);
    expect(response.body.pagination.pageSize).toStrictEqual(10);
    expect(response.body.pagination.pageCount).toStrictEqual(1);
    expect(response.body.pagination.totalDocument).toStrictEqual(3);
  });
  it("should be able to navigate pagination", async () => {
    const app = await createApp();

    const coaFactory = new CoaFactory();
    await coaFactory.createMany(3);

    const data = await retrieveAll("coas");

    const response = await request(app).get(`/v1/coas`).query({
      page: 2,
      pageSize: 2,
    });

    // expect http response
    expect(response.statusCode).toEqual(200);

    // expect response json
    expect(response.body.coas.length).toStrictEqual(1);
    expect(response.body.coas[0].name).toStrictEqual(data[2].name);

    expect(response.body.pagination.page).toStrictEqual(2);
    expect(response.body.pagination.pageSize).toStrictEqual(2);
    expect(response.body.pagination.pageCount).toStrictEqual(2);
    expect(response.body.pagination.totalDocument).toStrictEqual(3);
  });
  it("should be able to choose fields", async () => {
    const app = await createApp();

    const coaFactory = new CoaFactory();
    await coaFactory.createMany(3);

    const data = await retrieveAll("coas");

    const response = await request(app).get(`/v1/coas`).query({
      fields: "name",
    });

    // expect http response
    expect(response.statusCode).toEqual(200);

    // expect response json
    expect(response.body.coas.length).toStrictEqual(3);
    expect(response.body.coas[0]._id).toBeDefined();
    expect(response.body.coas[1]._id).toBeDefined();
    expect(response.body.coas[2]._id).toBeDefined();
    expect(response.body.coas[0].name).toStrictEqual(data[0].name);
    expect(response.body.coas[1].name).toStrictEqual(data[1].name);
    expect(response.body.coas[2].name).toStrictEqual(data[2].name);
    expect(response.body.coas[0].createdAt).not.toBeUndefined();
    expect(response.body.coas[1].createdAt).not.toBeUndefined();
    expect(response.body.coas[2].createdAt).not.toBeUndefined();

    expect(response.body.pagination.page).toStrictEqual(1);
    expect(response.body.pagination.pageSize).toStrictEqual(10);
    expect(response.body.pagination.pageCount).toStrictEqual(1);
    expect(response.body.pagination.totalDocument).toStrictEqual(3);
  });
  it("should be able to retrieve all coas", async () => {
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
    await coaFactory.createMany(3);

    const data = await retrieveAll("coas");

    const response = await request(app).get(`/v1/coas`);

    // expect http response
    expect(response.statusCode).toEqual(200);

    // expect response json
    expect(response.body.coas.length).toStrictEqual(3);
    expect(response.body.coas[0]._id).toBeDefined();
    expect(response.body.coas[0].number).toStrictEqual(data[0].number);
    expect(response.body.coas[0].name).toStrictEqual(data[0].name);
    expect(response.body.coas[0].type._id).toStrictEqual(data[0].type_id);
    expect(response.body.coas[0].type.name).not.toBeNull();
    expect(response.body.coas[0].category._id).toStrictEqual(data[0].category_id);
    expect(response.body.coas[0].category.name).not.toBeNull();
    expect(response.body.coas[0].group._id).toStrictEqual(data[0].group_id);
    expect(response.body.coas[0].group.name).not.toBeNull();
    expect(response.body.coas[0].subledger).toStrictEqual(data[0].subledger);
    expect(response.body.coas[0].position).toStrictEqual(data[0].position);

    expect(isValid(new Date(response.body.coas[0].createdAt))).toBeTruthy();
    expect(response.body.coas[1].name).toStrictEqual(data[1].name);
    expect(response.body.coas[2].name).toStrictEqual(data[2].name);

    expect(response.body.pagination.page).toStrictEqual(1);
    expect(response.body.pagination.pageSize).toStrictEqual(10);
    expect(response.body.pagination.pageCount).toStrictEqual(1);
    expect(response.body.pagination.totalDocument).toStrictEqual(3);
  });
});
