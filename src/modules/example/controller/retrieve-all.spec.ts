import request from "supertest";
import { createApp } from "@src/app.js";

describe("retrieve all users", () => {
  it("should be able to retrieve all users", async () => {
    const app = await createApp();
    const response = await request(app).get("/v1/examples");
    expect(response.statusCode).toEqual(200);
  });
});
