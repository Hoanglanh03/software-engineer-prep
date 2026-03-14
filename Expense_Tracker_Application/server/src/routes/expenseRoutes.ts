import express from "express";
import expenseController from "../controllers/expenseController";
const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Expense:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         title:
 *           type: string
 *           example: "Grocery shopping"
 *         amount:
 *           type: number
 *           format: float
 *           example: 78.55
 *         type:
 *           type: string
 *           enum: [income, expense]
 *           example: expense
 *         category:
 *           type: string
 *           example: Food
 *         date:
 *           type: string
 *           format: date
 *           example: "2025-12-10"
 *         note:
 *           type: string
 *           example: "Monthly groceries"
 *   parameters:
 *     ExpenseId:
 *       name: id
 *       in: path
 *       required: true
 *       schema:
 *         type: integer
 *       description: Expense identifier
 *
 * /expenses:
 *   get:
 *     tags:
 *       - Expense
 *     summary: Get all expenses
 *     responses:
 *       200:
 *         description: A list of expenses
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Expense'
 *       500:
 *         description: Internal server error
 *   post:
 *     tags:
 *       - Expense
 *     summary: Create a new expense
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [title, amount, type, category, date]
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Grocery shopping"
 *               amount:
 *                 type: number
 *                 format: float
 *                 example: 78.55
 *               type:
 *                 type: string
 *                 enum: [income, expense]
 *                 example: expense
 *               category:
 *                 type: string
 *                 example: Food
 *               date:
 *                 type: string
 *                 format: date
 *                 example: "2025-12-10"
 *               note:
 *                 type: string
 *                 example: "Monthly groceries"
 *     responses:
 *       201:
 *         description: Expense created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Expense'
 *       400:
 *         description: Missing required fields
 *       500:
 *         description: Internal server error
 *
 * /expenses/{id}:
 *   get:
 *     tags:
 *       - Expense
 *     summary: Get expense by id
 *     parameters:
 *       - $ref: '#/components/parameters/ExpenseId'
 *     responses:
 *       200:
 *         description: Expense found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Expense'
 *       404:
 *         description: Expense not found
 *       500:
 *         description: Internal server error
 *   put:
 *     tags:
 *       - Expense
 *     summary: Update expense by ID
 *     parameters:
 *       - $ref: '#/components/parameters/ExpenseId'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Expense'
 *     responses:
 *       200:
 *         description: Updated expense
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Expense'
 *       404:
 *         description: Expense not found
 *       500:
 *         description: Internal server error
 *   delete:
 *     tags:
 *       - Expense
 *     summary: Delete expense by ID
 *     parameters:
 *       - $ref: '#/components/parameters/ExpenseId'
 *     responses:
 *       200:
 *         description: Expense deleted
 *       404:
 *         description: Expense not found
 *       500:
 *         description: Internal server error
 */

router.get("/", expenseController.getExpenses);
router.get("/:id", expenseController.getExpenseById);
router.post("/", expenseController.createExpense);
router.put("/:id", expenseController.updateExpense);
router.delete("/:id", expenseController.deleteExpense);

export default router;
