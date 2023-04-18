import { NextFunction, Request, Response } from "express";
import { UpdateCoaTypesUseCase } from "../use-case/update.use-case.js";
import { db } from "@src/database/database.js";

export const updateController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const session = db.startSession();

    db.startTransaction();

    const updateCoaTypesUseCase = new UpdateCoaTypesUseCase(db);
    await updateCoaTypesUseCase.handle(req.params.id, req.body, { session });

    await db.commitTransaction();

    res.status(204).json();
  } catch (error) {
    await db.abortTransaction();
    next(error);
  } finally {
    await db.endSession();
  }
};
