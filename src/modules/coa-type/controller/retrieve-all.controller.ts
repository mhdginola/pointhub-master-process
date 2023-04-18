import { NextFunction, Request, Response } from "express";
import { RetrieveAllCoaTypesUseCase } from "../use-case/retrieve-all.use-case.js";
import { QueryInterface } from "@src/database/connection.js";
import { db } from "@src/database/database.js";

export const retrieveAllController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const createCoaTypesUseCase = new RetrieveAllCoaTypesUseCase(db);
    const result = await createCoaTypesUseCase.handle(req.query as unknown as QueryInterface);

    res.status(200).json({
      coaTypes: result.coaTypes,
      pagination: result.pagination,
    });
  } catch (error) {
    next(error);
  }
};
