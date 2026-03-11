const fs = require("fs");
const path = require("path");

const dbPath = path.join(__dirname, "../data/expenses.json");

const readData = () => {
  const data = fs.readFileSync(dbPath, "utf-8");
  return JSON.parse(data);
};

const writeData = async (data) => {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
};

const getAllExpense = () => {
  const data = readData();
  return data.expenses;
};

const getExpenseById = (id) => {
  const data = readData();
  return data.expenses.find((item) => item.id === id);
};

const createExpense = (expense) => {
  const data = readData();

  const newExpense = {
    id: Date.now(),
    title: expense.title,
    amount: expense.amount,
    type: expense.type,
    category: expense.category,
    date: expense.date,
    note: expense.note || "",
  };

  data.expenses.push(newExpense);

  writeData(data);
  return newExpense;
};

const updateExpense = (id, newData) => {
  const data = readData();

  const index = data.expenses.findIndex((e) => e.id === id);

  if (index === -1) return null;

  data.expenses[index] = {
    ...data.expenses[index],
    ...newData,
    id: data.expenses[index].id,
  };

  writeData(data);
  return data.expenses[index];
};

const deleteExpense = (id) => {
  const data = readData();

  const index = data.expenses.findIndex((e) => e.id === id);

  if (index === -1) return null;

  const deleted = data.expenses.splice(index, 1);

  writeData(data);

  return deleted;
};

module.exports = {
  readData,
  writeData,
  getAllExpense,
  getExpenseById,
  createExpense,
  updateExpense,
  deleteExpense,
};
