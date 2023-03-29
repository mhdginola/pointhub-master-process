import { MongoClient } from "mongodb";
import request from "supertest";
import { createApp } from "@src/app.js";
import databaseConfig from "@src/config/database.js";

const client = await MongoClient.connect(databaseConfig[databaseConfig.default].url);

describe("create an example", () => {
  beforeEach(async () => {
    await client.db(databaseConfig[databaseConfig.default].name).collection("examples").deleteMany({});
  });
  it("should be able to create an example", async () => {
    const app = await createApp();

    const response = await request(app).post("/v1/examples").send({ name: "Test Name" });
    expect(response.statusCode).toEqual(201);
  });
});
