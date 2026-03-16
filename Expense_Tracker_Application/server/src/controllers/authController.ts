import { Request, Response } from "express";
import { register, login } from "../service/authService";

export const signUp = async (req: Request, res: Response) => {
  const { userName, email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "Email and password are required",
    });
  }

  if (password.length < 6) {
    return res.status(400).json({
      message: "Password must be at least 6 characters",
    });
  }

  try {
    const newUser = await register({ userName, email, password });
    return res.status(201).json(newUser);
  } catch (error: any) {
    const message = error?.message || "Failed to register user.";
    return res.status(400).json({ message });
  }
};

export const signIn = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "Email and password are required",
    });
  }

  try {
    const token = await login({ email, password });
    return res.json({ token });
  } catch (error: any) {
    const message = error?.message || "Failed to login.";
    return res.status(400).json({ message });
  }
};
