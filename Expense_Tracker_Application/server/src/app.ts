import express from "express";
import cors from "cors";
import routes from "./routes/indexRoutes";
import dotenv from "dotenv";
import initDb from "./config/initDb";

import { setupSwagger } from "./config/swaggerSetup";

// activate environmental variables
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.use("/api/v1", routes);

setupSwagger(app);

initDb().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch(console.error);
