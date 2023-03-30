import request from "supertest";
import { createApp } from "@src/app.js";
import { resetDatabase, retrieve } from "@src/test/utils.js";

describe("create an example", () => {
  beforeEach(async () => {
    await resetDatabase();
  });
  it("should be able to create an example", async () => {
    const app = await createApp();

    const data = {
      name: "Test",
    };

    const response = await request(app).post("/v1/examples").send({ name: data.name });

    // expect http response
    expect(response.statusCode).toEqual(201);

    // expect response json
    expect(response.body._id).toBeDefined();

    // expect recorded data
    const exampleRecord = await retrieve("examples", response.body._id);
    expect(exampleRecord?._id).toBeDefined();
    expect(exampleRecord?.name).toBe(data.name);
    expect(exampleRecord?.status).toBe("active");
    expect(exampleRecord?.createdAt).toBeDefined();
  });
});
