import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import User from "../models/userModel";
import { config } from "dotenv";

config();

export const protect = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const tokenHeader = req.headers.authorization;
    if (!tokenHeader) {
      res.status(401).json({ message: "Not authorized" });
    }
    if (!tokenHeader.startsWith("Bearer ")) {
      res.status(401).json({ message: "Invalid token format" });
    }
    const token = tokenHeader.replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.JWT_TOKEN) as JwtPayload;
    req.body.user = await User.findById(decoded.id).select("-password");
    next();
  } catch (error) {
    res.status(401).json({ message: "Not authorized" });
  }
};
