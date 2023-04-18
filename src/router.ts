import express, { Express } from "express";
import coaRouter from "./modules/coa/router.js";
import coaCategoriesRouter from "./modules/coa-category/router.js";
import coaGroupsRouter from "./modules/coa-group/router.js";
import coaTypesRouter from "./modules/coa-type/router.js";
import exampleRouter from "./modules/example/router.js";
import processesRouter from "./modules/processes/router.js";

export default function () {
  const app: Express = express();

  /**
   * Register all available modules
   * <modules>/router.ts
   */
  app.use("/v1/examples", exampleRouter);
  app.use("/v1/processes", processesRouter);
  app.use("/v1/coas", coaRouter);
  app.use("/v1/coa-categories", coaCategoriesRouter);
  app.use("/v1/coa-groups", coaGroupsRouter);
  app.use("/v1/coa-types", coaTypesRouter);

  return app;
}
