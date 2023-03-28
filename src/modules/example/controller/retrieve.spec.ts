import request from "supertest";
import { createApp } from "@src/app.js";

describe("retrieve a user", () => {
  it("should be able to retrieve a user", async () => {
    const app = await createApp();
    const response = await request(app).get("/v1/examples/:id");
    expect(response.statusCode).toEqual(200);
  });
});
