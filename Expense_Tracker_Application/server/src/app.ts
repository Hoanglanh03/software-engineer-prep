import express from "express";
import routes from "./routes/indexRoutes";
import dotenv from "dotenv";

import { setupSwagger } from "./setups/swaggerSetup";

// activate environmental variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/api/v1", routes);

setupSwagger(app);

app.listen(PORT, () => {
  console.log(`App listening on port http://localhost:${PORT} `);
});
