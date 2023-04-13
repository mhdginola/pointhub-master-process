import { isValid } from "date-fns";
import request from "supertest";
import ExpeditionFactory from "../model/expedition.factory.js";
import { createApp } from "@src/app.js";
import { resetDatabase, retrieveAll } from "@src/test/utils.js";

describe("retrieve all expeditions", () => {
  beforeEach(async () => {
    await resetDatabase();
  });
  it("should be able to sort data in ascending order", async () => {
    const app = await createApp();

    const expeditionFactory = new ExpeditionFactory();
    const data = [
      {
        name: "Expedition C",
      },
      {
        name: "Expedition A",
      },
      {
        name: "Expedition B",
      },
    ];
    expeditionFactory.sequence(data);
    await expeditionFactory.createMany(3);

    const response = await request(app).get(`/v1/expeditions`).query({
      sort: "name",
    });

    // expect http response
    expect(response.statusCode).toEqual(200);

    // expect response json
    expect(response.body.expeditions.length).toStrictEqual(3);
    expect(response.body.expeditions[0].name).toStrictEqual(data[1].name);
    expect(response.body.expeditions[1].name).toStrictEqual(data[2].name);
    expect(response.body.expeditions[2].name).toStrictEqual(data[0].name);

    expect(response.body.pagination.page).toStrictEqual(1);
    expect(response.body.pagination.pageSize).toStrictEqual(10);
    expect(response.body.pagination.pageCount).toStrictEqual(1);
    expect(response.body.pagination.totalDocument).toStrictEqual(3);
  });
  it("should be able to sort data in descending order", async () => {
    const app = await createApp();

    const expeditionFactory = new ExpeditionFactory();
    const data = [
      {
        name: "Expedition C",
      },
      {
        name: "Expedition A",
      },
      {
        name: "Expedition B",
      },
    ];
    expeditionFactory.sequence(data);
    await expeditionFactory.createMany(3);

    const response = await request(app).get(`/v1/expeditions`).query({
      sort: "-name",
    });

    // expect http response
    expect(response.statusCode).toEqual(200);

    // expect response json
    expect(response.body.expeditions.length).toStrictEqual(3);
    expect(response.body.expeditions[0].name).toStrictEqual(data[0].name);
    expect(response.body.expeditions[1].name).toStrictEqual(data[2].name);
    expect(response.body.expeditions[2].name).toStrictEqual(data[1].name);

    expect(response.body.pagination.page).toStrictEqual(1);
    expect(response.body.pagination.pageSize).toStrictEqual(10);
    expect(response.body.pagination.pageCount).toStrictEqual(1);
    expect(response.body.pagination.totalDocument).toStrictEqual(3);
  });
  it("should be able to navigate pagination", async () => {
    const app = await createApp();

    const expeditionFactory = new ExpeditionFactory();
    await expeditionFactory.createMany(3);

    const data = await retrieveAll("expeditions");

    const response = await request(app).get(`/v1/expeditions`).query({
      page: 2,
      pageSize: 2,
    });

    // expect http response
    expect(response.statusCode).toEqual(200);

    // expect response json
    expect(response.body.expeditions.length).toStrictEqual(1);
    expect(response.body.expeditions[0].name).toStrictEqual(data[2].name);

    expect(response.body.pagination.page).toStrictEqual(2);
    expect(response.body.pagination.pageSize).toStrictEqual(2);
    expect(response.body.pagination.pageCount).toStrictEqual(2);
    expect(response.body.pagination.totalDocument).toStrictEqual(3);
  });
  it("should be able to choose fields", async () => {
    const app = await createApp();

    const expeditionFactory = new ExpeditionFactory();
    await expeditionFactory.createMany(3);

    const data = await retrieveAll("expeditions");

    const response = await request(app).get(`/v1/expeditions`).query({
      fields: "name",
    });

    // expect http response
    expect(response.statusCode).toEqual(200);

    // expect response json
    expect(response.body.expeditions.length).toStrictEqual(3);
    expect(response.body.expeditions[0]._id).toBeDefined();
    expect(response.body.expeditions[1]._id).toBeDefined();
    expect(response.body.expeditions[2]._id).toBeDefined();
    expect(response.body.expeditions[0].name).toStrictEqual(data[0].name);
    expect(response.body.expeditions[1].name).toStrictEqual(data[1].name);
    expect(response.body.expeditions[2].name).toStrictEqual(data[2].name);
    expect(response.body.expeditions[0].createdAt).toBeUndefined();
    expect(response.body.expeditions[1].createdAt).toBeUndefined();
    expect(response.body.expeditions[2].createdAt).toBeUndefined();

    expect(response.body.pagination.page).toStrictEqual(1);
    expect(response.body.pagination.pageSize).toStrictEqual(10);
    expect(response.body.pagination.pageCount).toStrictEqual(1);
    expect(response.body.pagination.totalDocument).toStrictEqual(3);
  });
  it("should be able to retrieve all expeditions", async () => {
    const app = await createApp();

    const expeditionFactory = new ExpeditionFactory();
    await expeditionFactory.createMany(3);

    const data = await retrieveAll("expeditions");

    const response = await request(app).get(`/v1/expeditions`);

    // expect http response
    expect(response.statusCode).toEqual(200);

    // expect response json
    expect(response.body.expeditions.length).toStrictEqual(3);
    expect(response.body.expeditions[0]._id).toBeDefined();
    expect(response.body.expeditions[0].code).toStrictEqual(data[0].code);
    expect(response.body.expeditions[0].name).toStrictEqual(data[0].name);
    expect(response.body.expeditions[0].address).toStrictEqual(data[0].address);
    expect(response.body.expeditions[0].phone).toStrictEqual(data[0].phone);
    expect(response.body.expeditions[0].email).toStrictEqual(data[0].email);
    expect(response.body.expeditions[0].contactPerson).toStrictEqual(data[0].contactPerson);
    expect(response.body.expeditions[0].bank.name).toStrictEqual(data[0].bank.name);
    expect(response.body.expeditions[0].bank.branch).toStrictEqual(data[0].bank.branch);
    expect(response.body.expeditions[0].bank.accountNumber).toStrictEqual(data[0].bank.accountNumber);
    expect(response.body.expeditions[0].bank.accountName).toStrictEqual(data[0].bank.accountName);
    expect(isValid(new Date(response.body.expeditions[0].createdAt))).toBeTruthy();
    expect(response.body.expeditions[1].name).toStrictEqual(data[1].name);
    expect(response.body.expeditions[2].name).toStrictEqual(data[2].name);

    expect(response.body.pagination.page).toStrictEqual(1);
    expect(response.body.pagination.pageSize).toStrictEqual(10);
    expect(response.body.pagination.pageCount).toStrictEqual(1);
    expect(response.body.pagination.totalDocument).toStrictEqual(3);
  });
});
