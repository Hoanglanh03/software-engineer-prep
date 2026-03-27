import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import { User, createUserDTO, loginUserDTO } from "../models/userModel";

import dotenv from "dotenv";
import prisma from "../config/prisma";

dotenv.config();

//==================================================
//register
//==================================================

export const register = async (dataSignUp: createUserDTO): Promise<User> => {
  if (!dataSignUp.email) {
    throw new Error("Email is required");
  }

  const existingUser = await prisma.users.findUnique({
    where: {
      email: String(dataSignUp.email).toLowerCase().trim(),
    },
  });

  console.log("email12313123:", existingUser);

  if (existingUser) {
    const error: any = new Error("User already exists");
    error.statusCode = 400;
    throw error;
  }

  const hashedPassword = await bcrypt.hash(dataSignUp.password, 10);

  const newUser = await prisma.users.create({
    data: {
      user_name: dataSignUp.userName,
      email: dataSignUp.email,
      password: hashedPassword,
    },
  });

  // Chuyển đổi từ kiểu của Prisma sang kiểu User của bạn
  return {
    userId: newUser.id,
    userName: newUser.user_name,
    email: newUser.email,
    role: newUser.role,
    createdAt: newUser.created_at,
    updatedAt: newUser.updated_at,
  };
};

//==================================================
//login a User
//==================================================

export const login = async (dataSignIn: loginUserDTO) => {
  const existingUser = await prisma.users.findUnique({
    where: {
      email: dataSignIn.email,
    },
  });

  if (!existingUser) {
    const error: any = new Error("Invalid credentials");
    error.statusCode = 401;
    throw error;
  }

  const isMatchPassword = await bcrypt.compare(
    dataSignIn.password,
    existingUser.password,
  );

  if (!isMatchPassword) {
    throw new Error("Invalid credentials");
  }

  const token = jwt.sign(
    {
      id: existingUser.id,
      email: existingUser.email,
      role: existingUser.role,
    },
    process.env.JWT_SECRET as string,
    {
      expiresIn: "1h",
    },
  );

  return {
    token,
    user: {
      id: existingUser.id,
      userName: existingUser.user_name,
      email: existingUser.email,
      role: existingUser.role,
    },
  };
};
