import { NextFunction, Request, Response } from "express";
import { RetrieveAllCoaCategoriesUseCase } from "../use-case/retrieve-all.use-case.js";
import { QueryInterface } from "@src/database/connection.js";
import { db } from "@src/database/database.js";

export const retrieveAllController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const createCoaCategoriesUseCase = new RetrieveAllCoaCategoriesUseCase(db);
    const result = await createCoaCategoriesUseCase.handle(req.query as unknown as QueryInterface);

    res.status(200).json({
      coaCategories: result.coaCategories,
      pagination: result.pagination,
    });
  } catch (error) {
    next(error);
  }
};
