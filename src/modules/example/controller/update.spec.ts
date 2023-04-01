import { isValid } from "date-fns";
import request from "supertest";
import ExampleFactory from "../model/example.factory";
import { createApp } from "@src/app.js";
import { resetDatabase, retrieve } from "@src/test/utils.js";

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
    const updateData = {
      name: "Edited Jane",
    };
    exampleFactory.sequence(data);
    const resultFactory = await exampleFactory.createMany(3);

    const response = await request(app).patch(`/v1/examples/${resultFactory.insertedIds[1]}`).send(updateData);

    // expect http response
    expect(response.statusCode).toEqual(204);

    // expect response json
    expect(response.body).toStrictEqual({});

    // expect recorded data
    const exampleRecord = await retrieve("examples", resultFactory.insertedIds[1]);
    expect(exampleRecord.name).toStrictEqual(updateData.name);
    expect(isValid(new Date(exampleRecord.updatedAt))).toBeTruthy();

    // expect another data unmodified
    const unmodifiedExampleRecord = await retrieve("examples", resultFactory.insertedIds[0]);
    expect(unmodifiedExampleRecord.name).toStrictEqual(data[0].name);
    expect(unmodifiedExampleRecord.updatedAt).toBeUndefined();
  });
});
