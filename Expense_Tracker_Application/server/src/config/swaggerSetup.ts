import { Express } from "express";
import swaggerUi from "swagger-ui-express";
import fs from "fs";
import path from "path";

const rawData = fs.readFileSync(
  path.resolve(__dirname, "./../Expense_Tracker_Application.json"),
  "utf-8",
);
const swaggerDocument = JSON.parse(rawData);

export const setupSwagger = (app: Express): void => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
};
