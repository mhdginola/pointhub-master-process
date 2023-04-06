import { NextFunction, Request, Response } from "express";
import { RetrieveProcessesUseCase } from "../use-case/retrieve.use-case.js";
import { db } from "@src/database/database.js";

export const retrieveController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const createProcessesUseCase = new RetrieveProcessesUseCase(db);
    const result = await createProcessesUseCase.handle(req.params.id);

    res.status(200).json({
      _id: result._id,
      name: result.name,
      status: result.status,
      createdAt: result.createdAt,
      isArchive: result.isArchive,
    });
  } catch (error) {
    next(error);
  }
};
