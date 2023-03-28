import { NextFunction, Request, Response } from "express";

export const retrieve = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.status(200).json({});
  } catch (error) {
    next(error);
  }
};
