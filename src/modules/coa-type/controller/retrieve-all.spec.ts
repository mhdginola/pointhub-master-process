import { isValid } from "date-fns";
import request from "supertest";
import CoaTypeFactory from "../model/coa-type.factory.js";
import { createApp } from "@src/app.js";
import { resetDatabase, retrieveAll } from "@src/test/utils.js";

describe("retrieve all coa types", () => {
  beforeEach(async () => {
    await resetDatabase();
  });
  it("should be able to sort data in ascending order", async () => {
    const app = await createApp();

    const coaTypeFactory = new CoaTypeFactory();
    const data = [
      {
        name: "CoaType C",
      },
      {
        name: "CoaType A",
      },
      {
        name: "CoaType B",
      },
    ];
    coaTypeFactory.sequence(data);
    await coaTypeFactory.createMany(3);

    const response = await request(app).get(`/v1/coa-types`).query({
      sort: "name",
    });

    // expect http response
    expect(response.statusCode).toEqual(200);

    // expect response json
    expect(response.body.coaTypes.length).toStrictEqual(3);
    expect(response.body.coaTypes[0].name).toStrictEqual(data[1].name);
    expect(response.body.coaTypes[1].name).toStrictEqual(data[2].name);
    expect(response.body.coaTypes[2].name).toStrictEqual(data[0].name);

    expect(response.body.pagination.page).toStrictEqual(1);
    expect(response.body.pagination.pageSize).toStrictEqual(10);
    expect(response.body.pagination.pageCount).toStrictEqual(1);
    expect(response.body.pagination.totalDocument).toStrictEqual(3);
  });
  it("should be able to sort data in descending order", async () => {
    const app = await createApp();

    const coaTypeFactory = new CoaTypeFactory();
    const data = [
      {
        name: "CoaType C",
      },
      {
        name: "CoaType A",
      },
      {
        name: "CoaType B",
      },
    ];
    coaTypeFactory.sequence(data);
    await coaTypeFactory.createMany(3);

    const response = await request(app).get(`/v1/coa-types`).query({
      sort: "-name",
    });

    // expect http response
    expect(response.statusCode).toEqual(200);

    // expect response json
    expect(response.body.coaTypes.length).toStrictEqual(3);
    expect(response.body.coaTypes[0].name).toStrictEqual(data[0].name);
    expect(response.body.coaTypes[1].name).toStrictEqual(data[2].name);
    expect(response.body.coaTypes[2].name).toStrictEqual(data[1].name);

    expect(response.body.pagination.page).toStrictEqual(1);
    expect(response.body.pagination.pageSize).toStrictEqual(10);
    expect(response.body.pagination.pageCount).toStrictEqual(1);
    expect(response.body.pagination.totalDocument).toStrictEqual(3);
  });
  it("should be able to navigate pagination", async () => {
    const app = await createApp();

    const coaTypeFactory = new CoaTypeFactory();
    await coaTypeFactory.createMany(3);

    const data = await retrieveAll("coaTypes");

    const response = await request(app).get(`/v1/coa-types`).query({
      page: 2,
      pageSize: 2,
    });

    // expect http response
    expect(response.statusCode).toEqual(200);

    // expect response json
    expect(response.body.coaTypes.length).toStrictEqual(1);
    expect(response.body.coaTypes[0].name).toStrictEqual(data[2].name);

    expect(response.body.pagination.page).toStrictEqual(2);
    expect(response.body.pagination.pageSize).toStrictEqual(2);
    expect(response.body.pagination.pageCount).toStrictEqual(2);
    expect(response.body.pagination.totalDocument).toStrictEqual(3);
  });
  it("should be able to choose fields", async () => {
    const app = await createApp();

    const coaTypeFactory = new CoaTypeFactory();
    await coaTypeFactory.createMany(3);

    const data = await retrieveAll("coaTypes");

    const response = await request(app).get(`/v1/coa-types`).query({
      fields: "name",
    });

    // expect http response
    expect(response.statusCode).toEqual(200);

    // expect response json
    expect(response.body.coaTypes.length).toStrictEqual(3);
    expect(response.body.coaTypes[0]._id).toBeDefined();
    expect(response.body.coaTypes[1]._id).toBeDefined();
    expect(response.body.coaTypes[2]._id).toBeDefined();
    expect(response.body.coaTypes[0].name).toStrictEqual(data[0].name);
    expect(response.body.coaTypes[1].name).toStrictEqual(data[1].name);
    expect(response.body.coaTypes[2].name).toStrictEqual(data[2].name);
    expect(response.body.coaTypes[0].createdAt).toBeUndefined();
    expect(response.body.coaTypes[1].createdAt).toBeUndefined();
    expect(response.body.coaTypes[2].createdAt).toBeUndefined();

    expect(response.body.pagination.page).toStrictEqual(1);
    expect(response.body.pagination.pageSize).toStrictEqual(10);
    expect(response.body.pagination.pageCount).toStrictEqual(1);
    expect(response.body.pagination.totalDocument).toStrictEqual(3);
  });
  it("should be able to retrieve all coa types", async () => {
    const app = await createApp();

    const coaTypeFactory = new CoaTypeFactory();
    await coaTypeFactory.createMany(3);

    const data = await retrieveAll("coaTypes");

    const response = await request(app).get(`/v1/coa-types`);

    // expect http response
    expect(response.statusCode).toEqual(200);

    // expect response json
    expect(response.body.coaTypes.length).toStrictEqual(3);
    expect(response.body.coaTypes[0]._id).toBeDefined();
    expect(response.body.coaTypes[0].name).toStrictEqual(data[0].name);
    expect(isValid(new Date(response.body.coaTypes[0].createdAt))).toBeTruthy();
    expect(response.body.coaTypes[1].name).toStrictEqual(data[1].name);
    expect(response.body.coaTypes[2].name).toStrictEqual(data[2].name);

    expect(response.body.pagination.page).toStrictEqual(1);
    expect(response.body.pagination.pageSize).toStrictEqual(10);
    expect(response.body.pagination.pageCount).toStrictEqual(1);
    expect(response.body.pagination.totalDocument).toStrictEqual(3);
  });
});
