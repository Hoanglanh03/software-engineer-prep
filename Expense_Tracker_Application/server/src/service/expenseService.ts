import { createExpenseDTO, Expense } from "../models/expenseModel";
import prisma from "../config/prisma";

//==================================
//Create expense
//==================================

const createExpense = async (newData: createExpenseDTO) => {
  return await prisma.expenses.create({
    data: {
      title: newData.title,
      amount: newData.amount,
      type: newData.type,
      category: newData.category,
      note: newData.note,
      user_id: newData.userId,
    },
  });
};

//==================================
//read expense
//==================================

const getAllExpense = async () => {
  return await prisma.expenses.findMany({
    include: {
      users: true,
    },
    orderBy: {
      created_at: "desc",
    },
  });
};

const getExpenseById = async (id: number) => {
  return await prisma.expenses.findUnique({
    where: { id: id },
    include: {
      users: true,
    },
  });
};

//==================================
//update expense
//==================================

const updateExpense = async (id: number, updateData: createExpenseDTO) => {
  return await prisma.expenses.update({
    where: { id: id },
    data: {
      title: updateData.title,
      amount: updateData.amount,
      type: updateData.type,
      category: updateData.category,
      note: updateData.note,
    },
  });
};

//==================================
//delete expense
//==================================

const deleteExpense = async (id: number) => {
  return await prisma.expenses.delete({
    where: { id: id },
  });
};

const expenseModel = {
  getAllExpense,
  getExpenseById,
  createExpense,
  updateExpense,
  deleteExpense,
};

export default expenseModel;
