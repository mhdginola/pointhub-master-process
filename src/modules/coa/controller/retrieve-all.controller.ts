import { NextFunction, Request, Response } from "express";
import { RetrieveAllCoaUseCase } from "../use-case/retrieve-all.use-case.js";
import { QueryInterface } from "@src/database/connection.js";
import { db } from "@src/database/database.js";

export const retrieveAllController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const createCoaUseCase = new RetrieveAllCoaUseCase(db);
    const result = await createCoaUseCase.handle(req.query as unknown as QueryInterface);

    res.status(200).json({
      coas: result.coas,
      pagination: result.pagination,
    });
  } catch (error) {
    next(error);
  }
};
