import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";


import { User, createUserDTO, loginUserDTO } from "../models/userModel";

import dotenv from "dotenv";
import pool from "../setups/database";



dotenv.config();

//==================================================
//register
//==================================================

export const register = async (dataSignUp: createUserDTO): Promise<User> => {
  const checkQuery = "SELECT * FROM users WHERE LOWER(email) = LOWER($1)";
  const existingUserRes = await pool.query(checkQuery, [dataSignUp.email]);

  if (existingUserRes.rows.length > 0) {
    throw { message: "User already exists", statusCode: 400 };
  }

  const hashedPassword = await bcrypt.hash(dataSignUp.password, 10);

  const insertQuery = `
    INSERT INTO users (user_name, email, password)
    VALUES ($1, $2, $3)
    RETURNING id, user_name, email, role, created_at, updated_at;
  `;

  const values = [
    dataSignUp.userName,
    dataSignUp.email.toLowerCase(),
    hashedPassword,
  ];

  const result = await pool.query(insertQuery, values);
  const row = result.rows[0];

  const newUser: User = {
    userId: row.userId,
    userName: row.user_name,
    email: row.email,
    role: row.role,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };

  return newUser;
};

//==================================================
//login a User
//==================================================

export const login = async (dataSignIn: loginUserDTO) => {
  const query = "SELECT * FROM users WHERE LOWER(email) = LOWER($1)";
  const result = await pool.query(query, [dataSignIn.email]);

  const existingUser = result.rows[0];

  if (!existingUser) {
    throw new Error("Invalid credentials");
  }

  const isMatchPassword = await bcrypt.compare(
    dataSignIn.password,
    existingUser.password,
  );

  console.log("isMatchPassword", isMatchPassword);

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
  console.log("token", token);

  return token;
};
