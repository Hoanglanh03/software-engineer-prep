import { v4 as uuidv4 } from "uuid";

import dbHelper from "../models/db.helper";
import { User, createUserDTO } from "../models/userModel";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const validateCreateUserDTO = (newData: createUserDTO): string | null => {
  if (
    !newData.userName ||
    typeof newData.userName !== "string" ||
    newData.userName.trim().length < 3
  ) {
    return "userName is required and must be at least 3 characters.";
  }

  if (
    !newData.email ||
    typeof newData.email !== "string" ||
    !emailRegex.test(newData.email)
  ) {
    return "email is required and must be a valid email address.";
  }

  if (
    !newData.password ||
    typeof newData.password !== "string" ||
    newData.password.length < 6
  ) {
    return "password is required and must be at least 6 characters.";
  }

  return null;
};

//==================================================
//create a User
//==================================================

const createUser = async (newData: createUserDTO): Promise<User> => {
  const validationError = validateCreateUserDTO(newData);
  if (validationError) {
    throw new Error(validationError);
  }

  const data = await dbHelper.readData();

  const existingUser = data.users.find(
    (u: User) => u.email.toLowerCase() === newData.email.toLowerCase(),
  );
  if (existingUser) {
    // new Error("A user with this email already exists.");
    throw {
      message: "User already exists",
      statusCode: 400,
    };
  }

  const uuidString: string = uuidv4();

  const newUser: User = {
    id: uuidString,
    ...newData,
  };

  data.users.push(newUser);

  await dbHelper.writeData(data);

  return newUser;
};

//==================================================
//Read User
//==================================================

const getUsers = async () => {
  const data = await dbHelper.readData();
  return data.users;
};

const getUserById = async (id: string): Promise<User> => {
  const data = await dbHelper.readData();
  return data.users.find((item: { id: string }) => item.id === String(id));
};

//==================================
//update user
//==================================

const updateUser = async (
  id: string,
  newData: createUserDTO,
): Promise<User> => {
  const data = await dbHelper.readData();

  const index = data.Users.findIndex(
    (e: { id: string }) => e.id === String(id),
  );

  if (index === -1) throw new Error("user not found");

  data.Users[index] = {
    ...data.Users[index],
    ...newData,
    id: data.Users[index].id,
  };

  await dbHelper.writeData(data);
  return data.Users[index];
};

//==================================
//delete user
//==================================

const deleteUser = async (id: string): Promise<User> => {
  const data = await dbHelper.readData();

  const index = data.users.findIndex(
    (e: { id: string }) => e.id === String(id),
  );

  if (index === -1) throw new Error("user not found");

  const deleted = data.users.splice(index, 1);

  await dbHelper.writeData(data);

  return deleted;
};

const userService = {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
};

export default userService;
