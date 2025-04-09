// Loading env variables
import dotenv from "dotenv";
dotenv.config();

import { app } from "./app";
import { connectDatabase } from "./config/db"


// verifying db connections
connectDatabase();
// 
function init() {
  const PORT = process.env.PORT;
  app.listen(PORT, () => {
    console.log(`server running at http://localhost:${PORT}`);
  });
}

init();