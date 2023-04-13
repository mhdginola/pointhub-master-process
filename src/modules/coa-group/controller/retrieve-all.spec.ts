import { isValid } from "date-fns";
import request from "supertest";
import CoaGroupFactory from "../model/coa-group.factory.js";
import { createApp } from "@src/app.js";
import { resetDatabase, retrieveAll } from "@src/test/utils.js";

describe("retrieve all coa groups", () => {
  beforeEach(async () => {
    await resetDatabase();
  });
  it("should be able to sort data in ascending order", async () => {
    const app = await createApp();

    const coaGroupFactory = new CoaGroupFactory();
    const data = [
      {
        name: "CoaGroup C",
      },
      {
        name: "CoaGroup A",
      },
      {
        name: "CoaGroup B",
      },
    ];
    coaGroupFactory.sequence(data);
    await coaGroupFactory.createMany(3);

    const response = await request(app).get(`/v1/coa-groups`).query({
      sort: "name",
    });

    // expect http response
    expect(response.statusCode).toEqual(200);

    // expect response json
    expect(response.body.coaGroups.length).toStrictEqual(3);
    expect(response.body.coaGroups[0].name).toStrictEqual(data[1].name);
    expect(response.body.coaGroups[1].name).toStrictEqual(data[2].name);
    expect(response.body.coaGroups[2].name).toStrictEqual(data[0].name);

    expect(response.body.pagination.page).toStrictEqual(1);
    expect(response.body.pagination.pageSize).toStrictEqual(10);
    expect(response.body.pagination.pageCount).toStrictEqual(1);
    expect(response.body.pagination.totalDocument).toStrictEqual(3);
  });
  it("should be able to sort data in descending order", async () => {
    const app = await createApp();

    const coaGroupFactory = new CoaGroupFactory();
    const data = [
      {
        name: "CoaGroup C",
      },
      {
        name: "CoaGroup A",
      },
      {
        name: "CoaGroup B",
      },
    ];
    coaGroupFactory.sequence(data);
    await coaGroupFactory.createMany(3);

    const response = await request(app).get(`/v1/coa-groups`).query({
      sort: "-name",
    });

    // expect http response
    expect(response.statusCode).toEqual(200);

    // expect response json
    expect(response.body.coaGroups.length).toStrictEqual(3);
    expect(response.body.coaGroups[0].name).toStrictEqual(data[0].name);
    expect(response.body.coaGroups[1].name).toStrictEqual(data[2].name);
    expect(response.body.coaGroups[2].name).toStrictEqual(data[1].name);

    expect(response.body.pagination.page).toStrictEqual(1);
    expect(response.body.pagination.pageSize).toStrictEqual(10);
    expect(response.body.pagination.pageCount).toStrictEqual(1);
    expect(response.body.pagination.totalDocument).toStrictEqual(3);
  });
  it("should be able to navigate pagination", async () => {
    const app = await createApp();

    const coaGroupFactory = new CoaGroupFactory();
    await coaGroupFactory.createMany(3);

    const data = await retrieveAll("coaGroups");

    const response = await request(app).get(`/v1/coa-groups`).query({
      page: 2,
      pageSize: 2,
    });

    // expect http response
    expect(response.statusCode).toEqual(200);

    // expect response json
    expect(response.body.coaGroups.length).toStrictEqual(1);
    expect(response.body.coaGroups[0].name).toStrictEqual(data[2].name);

    expect(response.body.pagination.page).toStrictEqual(2);
    expect(response.body.pagination.pageSize).toStrictEqual(2);
    expect(response.body.pagination.pageCount).toStrictEqual(2);
    expect(response.body.pagination.totalDocument).toStrictEqual(3);
  });
  it("should be able to choose fields", async () => {
    const app = await createApp();

    const coaGroupFactory = new CoaGroupFactory();
    await coaGroupFactory.createMany(3);

    const data = await retrieveAll("coaGroups");

    const response = await request(app).get(`/v1/coa-groups`).query({
      fields: "name",
    });

    // expect http response
    expect(response.statusCode).toEqual(200);

    // expect response json
    expect(response.body.coaGroups.length).toStrictEqual(3);
    expect(response.body.coaGroups[0]._id).toBeDefined();
    expect(response.body.coaGroups[1]._id).toBeDefined();
    expect(response.body.coaGroups[2]._id).toBeDefined();
    expect(response.body.coaGroups[0].name).toStrictEqual(data[0].name);
    expect(response.body.coaGroups[1].name).toStrictEqual(data[1].name);
    expect(response.body.coaGroups[2].name).toStrictEqual(data[2].name);
    expect(response.body.coaGroups[0].createdAt).toBeUndefined();
    expect(response.body.coaGroups[1].createdAt).toBeUndefined();
    expect(response.body.coaGroups[2].createdAt).toBeUndefined();

    expect(response.body.pagination.page).toStrictEqual(1);
    expect(response.body.pagination.pageSize).toStrictEqual(10);
    expect(response.body.pagination.pageCount).toStrictEqual(1);
    expect(response.body.pagination.totalDocument).toStrictEqual(3);
  });
  it("should be able to retrieve all coa groups", async () => {
    const app = await createApp();

    const coaGroupFactory = new CoaGroupFactory();
    await coaGroupFactory.createMany(3);

    const data = await retrieveAll("coaGroups");

    const response = await request(app).get(`/v1/coa-groups`);

    // expect http response
    expect(response.statusCode).toEqual(200);

    // expect response json
    expect(response.body.coaGroups.length).toStrictEqual(3);
    expect(response.body.coaGroups[0]._id).toBeDefined();
    expect(response.body.coaGroups[0].name).toStrictEqual(data[0].name);
    expect(isValid(new Date(response.body.coaGroups[0].createdAt))).toBeTruthy();
    expect(response.body.coaGroups[1].name).toStrictEqual(data[1].name);
    expect(response.body.coaGroups[2].name).toStrictEqual(data[2].name);

    expect(response.body.pagination.page).toStrictEqual(1);
    expect(response.body.pagination.pageSize).toStrictEqual(10);
    expect(response.body.pagination.pageCount).toStrictEqual(1);
    expect(response.body.pagination.totalDocument).toStrictEqual(3);
  });
});
