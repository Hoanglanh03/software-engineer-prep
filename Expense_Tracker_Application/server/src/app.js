const express = require("express");
const app = express();
require("dotenv").config();

const setupSwagger = require("./setups/swaggerSetup");
const expenseRouter = require("./routes/expenseRouter");

const PORT = process.env.PORT || 3000;

app.use(express.json());

setupSwagger(app);

app.use("/expenses", expenseRouter);
app.listen(PORT, () => {
  console.log(`App listening on port http://localhost:${PORT} `);
});
