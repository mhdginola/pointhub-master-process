import { ProcessStatusTypes } from "./process.entity.js";

export const processesSeeds = [
  {
    name: "Example Name 1",
    firstName: "Example",
    lastName: "Name 1",
    status: ProcessStatusTypes.Active,
    createdAt: new Date(),
  },
  {
    name: "Example Name 2",
    firstName: "Example",
    lastName: "Name 2",
    status: ProcessStatusTypes.Active,
    createdAt: new Date(),
  },
  {
    name: "Example Name 3",
    firstName: "Example",
    lastName: "Name 3",
    status: ProcessStatusTypes.Active,
    createdAt: new Date(),
  },
];
