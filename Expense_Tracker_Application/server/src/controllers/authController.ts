import { Request, Response } from "express";
import { register, login } from "../service/authService";

import { signInSchema, signUpSchema } from "../validation/auth.schema";

export const signUp = async (req: Request, res: Response) => {
  const validation = signUpSchema.safeParse(req.body);

  console.log(req.body);
  console.log(validation.data);

  if (!validation.success) {
    return res.status(400).json({
      status: "error",
      message: "Dữ liệu không hợp lệ",
      errors: validation.error.flatten().fieldErrors,
    });
  }

  try {
    const newUser = await register(validation.data);
    return res.status(201).json({
      message: "User registered successfully",
      user: newUser,
    });
  } catch (error: any) {
    return res.status(400).json({
      status: "error",
      message: error?.message || "Đăng ký thất bại",
    });
  }
};

export const signIn = async (req: Request, res: Response) => {
  const validation = signInSchema.safeParse(req.body);

  if (!validation.success) {
    return res.status(400).json({
      status: "error",
      errors: validation.error.flatten().fieldErrors,
    });
  }

  try {
    const token = await login(validation.data);
    return res.json({ token });
  } catch (error: any) {
    return res.status(401).json({
      status: "error",
      message: error?.message || "Đăng nhập thất bại",
    });
  }
};
