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
      return res.status(401).json({ message: "Not authorized" });
    }
    if (!tokenHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Invalid token format" });
    }
    const token = tokenHeader.replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.JWT_TOKEN) as JwtPayload;

    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }
    req.body.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: `Not authorized, ${error}` });
  }
};
