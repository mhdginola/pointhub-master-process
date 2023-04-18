import { NextFunction, Request, Response } from "express";
import { RetrieveAllCoaGroupsUseCase } from "../use-case/retrieve-all.use-case.js";
import { QueryInterface } from "@src/database/connection.js";
import { db } from "@src/database/database.js";

export const retrieveAllController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const createCoaGroupsUseCase = new RetrieveAllCoaGroupsUseCase(db);
    const result = await createCoaGroupsUseCase.handle(req.query as unknown as QueryInterface);

    res.status(200).json({
      coaGroups: result.coaGroups,
      pagination: result.pagination,
    });
  } catch (error) {
    next(error);
  }
};
