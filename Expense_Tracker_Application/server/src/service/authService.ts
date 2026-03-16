import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import dbHelper from "../models/db.helper";
import { User, createUserDTO, loginUserDTO } from "../models/userModel";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { generateToken } from "../utils/jwt";
dotenv.config();

//==================================================
//login a User
//==================================================

export const register = async (dataSignUp: createUserDTO): Promise<User> => {
  const data = await dbHelper.readData();

  const existingUser = data.users.find(
    (u: User) =>
      u.email.toLocaleLowerCase() === dataSignUp.email.toLocaleLowerCase(),
  );

  if (existingUser) {
    throw {
      message: "User already exists",
      statusCode: 400,
    };
  }

  const hashedPassword = await bcrypt.hash(dataSignUp.password, 10);

  const newUser: User = {
    id: uuidv4(),
    ...dataSignUp,
    password: hashedPassword,
    role: "customer",
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  data.users.push(newUser);
  await dbHelper.writeData(data);

  return newUser;
};

export const login = async (dataSignIn: loginUserDTO) => {
  const data = await dbHelper.readData();

  const existingUser = data.users.find(
    (u: User) =>
      u.email.toLocaleLowerCase() === dataSignIn.email.toLocaleLowerCase(),
  );

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
