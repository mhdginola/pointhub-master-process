import request from "supertest";
import { createApp } from "@src/app.js";

describe("create an example", () => {
  it("should be able to create an example", async () => {
    const app = await createApp();
    const response = await request(app).post("/v1/examples");
    expect(response.statusCode).toEqual(201);
  });
});
