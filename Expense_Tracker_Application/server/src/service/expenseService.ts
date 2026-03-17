import { createExpenseDTO, Expense } from "../models/expenseModel";
import pool from "../setups/database";

//==================================
//Create expense
//==================================

const createExpense = async (newData: createExpenseDTO): Promise<Expense> => {
  const query = `
    INSERT INTO expenses (title, amount, type, category, note, user_id) 
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *;`;

  const values = [
    newData.title,
    newData.amount,
    newData.type,
    newData.category,
    newData.note,
    newData.userId,
  ];

  const result = await pool.query(query, values);
  const row = result.rows[0];

  const newExpense: Expense = {
    id: row.id,
    title: row.title,
    amount: row.amount,
    type: row.type,
    category: row.category,
    note: row.note,
    userId: row.user_id,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };

  return newExpense;
};

//==================================
//read expense
//==================================

const getAllExpense = async () => {
  const query = "SELECT * FROM expenses ORDER BY created_at DESC";
  const result = await pool.query(query);
  return result.rows;
};

const getExpenseById = async (id: string): Promise<Expense | undefined> => {
  const query = "SELECT * FROM expenses WHERE id = $1";
  const result = await pool.query(query, [id]);
  return result.rows[0];
};

//==================================
//update expense
//==================================

const updateExpense = async (
  id: string,
  newData: createExpenseDTO,
): Promise<Expense> => {
  const query = `UPDATE expenses SET title = $1 , amount = $2, category = $3, note = $4 WHERE id = $5 RETURNING *;`;

  const values = [
    newData.title,
    newData.amount,
    newData.category,
    newData.note,
    id,
  ];

  const result = await pool.query(query, values);

  if (result.rowCount === 0) throw new Error("Expense not found");

  return result.rows[0];
};

//==================================
//delete expense
//==================================

const deleteExpense = async (id: string): Promise<Expense> => {
  const query = "DELETE FROM expenses WHERE id = $1 RETURNING *";
  const result = await pool.query(query, [id]);

  if (result.rowCount === 0) throw new Error("Expense not found");

  return result.rows[0];
};

const expenseModel = {
  getAllExpense,
  getExpenseById,
  createExpense,
  updateExpense,
  deleteExpense,
};

export default expenseModel;
