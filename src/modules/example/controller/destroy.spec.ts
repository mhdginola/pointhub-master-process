import request from "supertest";
import { createApp } from "@src/app.js";

describe("delete an example", () => {
  it("should be able to delete an example", async () => {
    const app = await createApp();
    const response = await request(app).delete("/v1/examples/:id");
    expect(response.statusCode).toEqual(204);
  });
});
