import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const protect = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.body.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Not authorized" });
  }
};
