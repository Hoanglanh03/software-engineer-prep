import express from "express";

import expenseRoutes from "./expenseRoutes";
import userRoutes from "./userRoutes";

import * as authController from "../controllers/authController";
import { authenticate } from "../middlewares/authenMiddleware";

const router = express.Router();

router.post("/signup", authController.signUp);
router.post("/login", authController.signIn);

router.use("/users", authenticate, userRoutes);
router.use("/expenses", authenticate, expenseRoutes);

export default router;
