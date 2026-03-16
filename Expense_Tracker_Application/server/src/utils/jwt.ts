import jwt from "jsonwebtoken";
import { User } from "../models/userModel";

export const generateToken = (payload: User) => {
  return jwt.sign(payload, process.env.JWT_SECRET as string, {
    expiresIn: "1h",
  });
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, process.env.JWT_SECRET as string);
};