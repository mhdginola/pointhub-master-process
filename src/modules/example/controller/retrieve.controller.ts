import { NextFunction, Request, Response } from "express";
import { RetrieveExampleUseCase } from "../use-case/retrieve.use-case";
import { db } from "@src/database/database.js";

export const retrieve = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const createExampleUseCase = new RetrieveExampleUseCase(db);
    const result = await createExampleUseCase.handle(req.params);

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
