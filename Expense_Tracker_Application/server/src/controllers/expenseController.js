const expenseModel = require("../models/expenseModel");

const getExpenses = (req, res) => {
  try {
    const data = expenseModel.getAllExpense();

    if (data) {
      console.log("connect success");
      return res.json(data);
    } else {
      return res.status(404).json({ message: "not search data" });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getExpenseById = (req, res) => {
  try {
    const { id } = req.params;
    const data = expenseModel.getExpenseById(Number(id));
    if (!data) {
      return res.status(404).json({ error: "Expense not found" });
    }
    return res.json(data);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const createExpense = (req, res) => {
  try {
    const { title, amount, type, category, date, note } = req.body;
    if (!title || !amount || !type || !category || !date) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    const newExpense = expenseModel.createExpense({
      title,
      amount,
      type,
      category,
      date,
      note,
    });
    return res.status(201).json(newExpense);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const updateExpense = (req, res) => {
  try {
    const { id } = req.params;
    const updatedExpense = expenseModel.updateExpense(Number(id), req.body);
    if (!updatedExpense) {
      return res.status(404).json({ error: "Expense not found" });
    }
    return res.json(updatedExpense);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const deleteExpense = (req, res) => {
  try {
    const { id } = req.params;
    const deleted = expenseModel.deleteExpense(Number(id));
    if (!deleted || deleted.length === 0) {
      return res.status(404).json({ error: "Expense not found" });
    }
    return res.json({ message: "Expense deleted", data: deleted });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getExpenses,
  getExpenseById,
  createExpense,
  updateExpense,
  deleteExpense,
};
