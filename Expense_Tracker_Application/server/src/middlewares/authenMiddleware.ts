import { Response, NextFunction, Request } from "express";
import jwt from "jsonwebtoken";

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Invalid authorization header",
      });
    }

    const token = authHeader.split(" ")[1];

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
      (req as any).user = decoded;
    } catch (error: any) {
      if (error.name === "TokenExpiredError") {
        console.log("Token expired");
      } else {
        console.log(" not valid", error);
      }
    }

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }
};
