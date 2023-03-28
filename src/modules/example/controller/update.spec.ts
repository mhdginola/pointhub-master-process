import request from "supertest";
import { createApp } from "@src/app.js";

describe("update a user", () => {
  it("should be able to update a user", async () => {
    const app = await createApp();
    const response = await request(app).patch("/v1/examples/:id");
    expect(response.statusCode).toEqual(204);
  });
});
