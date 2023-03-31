import { ExampleStatusTypes } from "./example.entity.js";

export const exampleSeeds = [
  {
    name: "Example Name 1",
    status: ExampleStatusTypes.Active,
    createdAt: new Date(),
  },
  {
    name: "Example Name 2",
    status: ExampleStatusTypes.Active,
    createdAt: new Date(),
  },
  {
    name: "Example Name 3",
    status: ExampleStatusTypes.Active,
    createdAt: new Date(),
  },
];
