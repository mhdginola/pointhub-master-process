import request from "supertest";
import { createApp } from "@src/app.js";

describe("update an example", () => {
  it("should be able to update an example", async () => {
    const app = await createApp();
    const response = await request(app).patch("/v1/examples/:id");
    expect(response.statusCode).toEqual(204);
  });
});
