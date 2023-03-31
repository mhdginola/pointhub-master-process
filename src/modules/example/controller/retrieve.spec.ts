import request from "supertest";
import ExampleFactory from "../model/example.factory";
import { createApp } from "@src/app.js";
import { resetDatabase } from "@src/test/utils.js";

describe("retrieve an example", () => {
  beforeEach(async () => {
    await resetDatabase();
  });
  it("should be able to retrieve an example", async () => {
    const app = await createApp();

    const exampleFactory = new ExampleFactory();
    const data = [
      {
        name: "John Doe",
      },
      {
        name: "Jane",
      },
      {
        name: "Charles",
      },
    ];
    exampleFactory.sequence(data);
    const resultFactory = await exampleFactory.createMany(3);

    const response = await request(app).get(`/v1/examples/${resultFactory.insertedIds[1]}`);

    // expect http response
    expect(response.statusCode).toEqual(200);

    // expect response json
    expect(response.body._id).toBeDefined();
    expect(response.body.name).toStrictEqual(data[1].name);
    expect(response.body.status).toStrictEqual("active");
    expect(response.body.createdAt instanceof Date);
  });
});
