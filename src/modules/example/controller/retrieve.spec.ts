import request from "supertest";
import { createApp } from "@src/app.js";
import { ReadManyResultInterface, ReadResultInterface, CreateManyResultInterface } from "@src/database/connection";
import { resetDatabase, retrieve } from "@src/test/utils.js";

describe("retrieve an example", () => {
  beforeEach(async () => {
    await resetDatabase();
  });
  it("should be able to retrieve an example", async () => {
    const app = await createApp();

    const data = [
      {
        name: "Test 1",
      },
      {
        name: "Test 2",
      },
      {
        name: "Test 3",
      },
    ];

    const responseCreateManyExample = await request(app).post("/v1/examples/create-many").send(data);
    const responseCreateManyExampleBody = responseCreateManyExample.body as unknown as CreateManyResultInterface;
    const response = await request(app).get(`/v1/examples/${responseCreateManyExampleBody.insertedIds[1]}`);

    // expect http response
    expect(response.statusCode).toEqual(200);

    // expect response json
    expect(response.body._id).toBeDefined();
    expect(response.body.name).toStrictEqual(data[1].name);
    expect(response.body.status).toStrictEqual("active");
    expect(response.body.createdAt instanceof Date);
  });
});
