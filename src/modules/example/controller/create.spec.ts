import request from "supertest";
import { createApp } from "@src/app.js";

describe("create a user", () => {
  it("should be able to create a user", async () => {
    const app = await createApp();
    const response = await request(app).post("/v1/examples");
    expect(response.statusCode).toEqual(201);
  });
});
