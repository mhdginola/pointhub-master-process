import request from "supertest";
import { createApp } from "@src/app.js";

describe("delete a user", () => {
  it("should be able to delete a user", async () => {
    const app = await createApp();
    const response = await request(app).delete("/v1/examples/:id");
    expect(response.statusCode).toEqual(204);
  });
});
