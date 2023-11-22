import User from "../../models/userModel";

declare module "express-serve-static-core" {
  export interface Request {
    user: typeof User;
  }
}
