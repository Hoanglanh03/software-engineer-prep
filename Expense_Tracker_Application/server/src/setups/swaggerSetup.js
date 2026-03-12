const swaggerJsDoc = require("../Expense_Tracker_Application_hl.json");
const swaggerUi = require("swagger-ui-express");

const setupSwagger = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerJsDoc));
};

module.exports = setupSwagger;
