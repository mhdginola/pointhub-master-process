import { NextFunction, Request, Response } from "express";

export const createMany = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.status(201).json({});
  } catch (error) {
    next(error);
  } finally {
  }
};
