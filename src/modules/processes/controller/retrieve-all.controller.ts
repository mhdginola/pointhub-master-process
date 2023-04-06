import { NextFunction, Request, Response } from "express";
import { RetrieveAllProcessesUseCase } from "../use-case/retrieve-all.use-case.js";
import { QueryInterface } from "@src/database/connection.js";
import { db } from "@src/database/database.js";

export const retrieveAllController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const createProcessesUseCase = new RetrieveAllProcessesUseCase(db);
    const result = await createProcessesUseCase.handle(req.query as unknown as QueryInterface);

    res.status(200).json({
      processes: result.processes,
      pagination: result.pagination,
    });
  } catch (error) {
    next(error);
  }
};
