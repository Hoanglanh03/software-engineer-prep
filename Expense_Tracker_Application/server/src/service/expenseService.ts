import { v4 as uuidv4 } from "uuid";
import dbHelper from "../models/db.helper";
import { createExpenseDTO, Expense } from "../models/expenseModel";

//==================================
//Create expense
//==================================

const createExpense = async (newData: createExpenseDTO): Promise<Expense> => {
  const data = await dbHelper.readData();

  const uuidString: string = uuidv4();

  const newExpense: Expense = {
    id: uuidString,
    ...newData,
  };

  data.expenses.push(newExpense);

  await dbHelper.writeData(data);
  return newExpense;
};

//==================================
//read expense
//==================================

const getAllExpense = async () => {
  const data = await dbHelper.readData();
  return data.expenses;
};

const getExpenseById = async (id: string): Promise<Expense | undefined> => {
  const data = await dbHelper.readData();
  return data.expenses.find((item: { id: string }) => item.id === id);
};

//==================================
//update expense
//==================================

const updateExpense = async (
  id: string,
  newData: createExpenseDTO,
): Promise<Expense> => {
  const data = await dbHelper.readData();

  const index = data.expenses.findIndex((e: { id: string }) => e.id === id);

  if (index === -1) throw new Error("Expense not found");

  data.expenses[index] = {
    ...data.expenses[index],
    ...newData,
    id: data.expenses[index].id,
  };

  await dbHelper.writeData(data);
  return data.expenses[index];
};

//==================================
//delete expense
//==================================

const deleteExpense = async (id: string): Promise<Expense> => {
  const data = await dbHelper.readData();

  const index = data.expenses.findIndex((e: { id: string }) => e.id === id);

  if (index === -1) throw new Error("Expense not found");

  const [deleted] = data.expenses.splice(index, 1);

  await dbHelper.writeData(data);

  return deleted;
};

const expenseModel = {
  getAllExpense,
  getExpenseById,
  createExpense,
  updateExpense,
  deleteExpense,
};

export default expenseModel;
