import express from "express";
import routes from "./routes/indexRoutes";
import dotenv from "dotenv";
import initDb from "./setups/initDb";

import { setupSwagger } from "./setups/swaggerSetup";

// activate environmental variables
dotenv.config();

const app = express();
app.use(express.json());


const PORT = process.env.PORT || 3000;

app.use("/api/v1", routes);

setupSwagger(app);

initDb().then(() => {
  app.listen(3000, () => {
    console.log("Server is running on port 3000");
  });
});

app.listen(PORT, () => {
  console.log(`App listening on port http://localhost:${PORT} `);
});
