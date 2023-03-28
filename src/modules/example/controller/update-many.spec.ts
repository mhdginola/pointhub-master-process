import request from "supertest";
import { createApp } from "@src/app.js";

describe("update many users", () => {
  it("should be able to update many users", async () => {
    const app = await createApp();
    const response = await request(app).post("/v1/examples/update-many");
    expect(response.statusCode).toEqual(204);
  });
});
