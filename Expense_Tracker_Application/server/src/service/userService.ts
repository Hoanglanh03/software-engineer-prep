import { User, createUserDTO } from "../models/userModel";
import prisma from "../config/prisma";

//==================================================
//Create User
//==================================================

const createUser = async (newData: createUserDTO) => {
  const existingUser = await prisma.users.findUnique({
    where: { email: newData.email.toLowerCase() },
  });
  if (existingUser) {
    throw new Error("User already exists");
  }

  return await prisma.users.create({
    data: {
      user_name: newData.userName,
      email: newData.email.toLowerCase(),
      password: newData.password,
    },
  });
};

//==================================================
//Read User
//==================================================

const getUsers = async () => {
  return await prisma.users.findMany({
    orderBy: {
      created_at: "desc",
    },
  });
};

const getUserById = async (id: number) => {
  return await prisma.users.findUnique({
    where: { id: id },
  });
};

//==================================
//update user
//==================================

const updateUser = async (id: number, newData: createUserDTO) => {
  return await prisma.users.update({
    where: { id: id },
    data: {
      user_name: newData.userName,
      email: newData.email?.toLowerCase(),
    },
  });
};

//==================================
//delete user
//==================================

const deleteUser = async (id: number) => {
  return await prisma.users.delete({
    where: { id: id },
  });
};

const userService = {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
};

export default userService;
