import { Request, Response } from "express";
import expenseModel from "../service/expenseService";

const createExpense = async (req: Request, res: Response) => {
  try {
    const { title, amount, type, category, date, note } = req.body;
    if (!title || !amount || !type || !category || !date) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    const newExpense = await expenseModel.createExpense({
      title,
      amount,
      type,
      category,
      date,
      note,
    });
    return res.status(201).json(newExpense);
  } catch (error) {
    return res.status(500).json({ error: (error as Error).message });
  }
};

const getExpenses = async (req: Request, res: Response) => {
  try {
    const data = await expenseModel.getAllExpense();

    if (data) {
      console.log("connect success");
      return res.status(200).json(data);
    } else {
      return res.status(404).json({ message: "not search data" });
    }
  } catch (error) {
    return res.status(500).json({ error: (error as Error).message });
  }
};

const getExpenseById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = await expenseModel.getExpenseById(String(id));
    if (!data) {
      return res.status(404).json({ error: "Expense not found" });
    }
    return res.json(data);
  } catch (error) {
    return res.status(500).json({ error: (error as Error).message });
  }
};

const updateExpense = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedExpense = await expenseModel.updateExpense(
      String(id),
      req.body,
    );
    if (!updatedExpense) {
      return res.status(404).json({ error: "Expense not found" });
    }
    return res.json(updatedExpense);
  } catch (error) {
    return res.status(500).json({ error: (error as Error).message });
  }
};

const deleteExpense = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleted = await expenseModel.deleteExpense(String(id));
    if (!deleted) {
      return res.status(404).json({ error: "Expense not found" });
    }
    return res.json({ message: "Expense deleted", data: deleted });
  } catch (error) {
    return res.status(500).json({ error: (error as Error).message });
  }
};

const expenseController = {
  getExpenses,
  getExpenseById,
  createExpense,
  updateExpense,
  deleteExpense,
};

export default expenseController;
