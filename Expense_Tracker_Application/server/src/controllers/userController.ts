import { Request, Response } from "express";
import userService from "../service/userService";

//==================================================
//createNewUser
//==================================================

const createNewUser = async (req: Request, res: Response) => {
  const reqIn = req.body;

  try {
    const newUser = await userService.createUser(reqIn);
    return res.status(201).json(newUser);
  } catch (error: any) {
    const message = error?.message || "Failed to create user.";

    if (
      message.includes("already exists") ||
      message.includes("required") ||
      message.includes("valid email")
    ) {
      return res.status(400).json({ error: message });
    }

    return res.status(500).json({ error: message });
  }
};

//==================================================
//Read User
//==================================================

const getUsers = async (req: Request, res: Response) => {
  try {
    const data = await userService.getUsers();

    if (data) {
      console.log("connect success");
      return res.json(data);
    } else {
      return res.status(404).json({ message: "not search data" });
    }
  } catch (error) {
    return res.status(500).json({ error: (error as Error).message });
  }
};

const getUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = await userService.getUserById(String(id));
    if (!data) {
      return res.status(404).json({ error: "User not found" });
    }
    return res.json(data);
  } catch (error) {
    return res.status(500).json({ error: (error as Error).message });
  }
};

//==================================
//update user
//==================================

const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedUser = await userService.updateUser(String(id), req.body);
    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }
    return res.json(updatedUser);
  } catch (error) {
    return res.status(500).json({ error: (error as Error).message });
  }
};

//==================================
//delete user
//==================================

const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleted = await userService.deleteUser(String(id));
    if (!deleted) {
      return res.status(404).json({ error: "User not found" });
    }
    return res.json({ message: "Expense deleted", data: deleted });
  } catch (error) {
    return res.status(500).json({ error: (error as Error).message });
  }
};

const userController = {
  createNewUser,
  getUserById,
  getUsers,
  updateUser,
  deleteUser,
};
export default userController;
