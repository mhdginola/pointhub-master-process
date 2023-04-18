import { NextFunction, Request, Response } from "express";
import { RetrieveCoaUseCase } from "../use-case/retrieve.use-case.js";
import { QueryInterface } from "@src/database/connection.js";
import { db } from "@src/database/database.js";

export const retrieveController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const createCoaCategoiresUseCase = new RetrieveCoaUseCase(db);
    const result = await createCoaCategoiresUseCase.handle(req.params.id, req.query as unknown as QueryInterface);

    res.status(200).json({
      _id: result._id,
      name: result.name,
      number: result.number,
      type: result.type,
      group: result.group,
      category: result.category,
      subledger: result.subledger,
      position: result.position,
      createdAt: result.createdAt,
    });
  } catch (error) {
    next(error);
  }
};
