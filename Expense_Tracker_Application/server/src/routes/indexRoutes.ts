import express from "express";
import expenseRoutes from "./expenseRoutes";
import userRoutes from "./userRoutes";

const router = express.Router();

router.use("/users", userRoutes);
router.use("/expenses", expenseRoutes);

export default router;
