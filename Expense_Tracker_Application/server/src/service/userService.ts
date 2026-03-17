import dbHelper from "../models/db.helper";
import { User, createUserDTO } from "../models/userModel";

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
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
};

export default userService;
