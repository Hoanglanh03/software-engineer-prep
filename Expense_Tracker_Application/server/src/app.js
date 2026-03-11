const express = require("express");
const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const expenseRouter = require("./routes/expenseRouter");

app.use("/expense", expenseRouter);

app.listen(PORT, () => {
  console.log(`App listening on port http://localhost:${PORT} `);
});
