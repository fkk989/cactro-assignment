import express, { Express } from "express";
import cors from "cors";
import { createResponse } from "../utils/helpers";
import { userRouter } from "./routers/user.route";
import { verifyUserToken } from "./middlewares/verifyUserToken";
import { taskRouter } from "./routers/task.route";


export const app: Express = express();

app.use(cors(), express.json());


app.use("/api/user", userRouter)
app.use("/api/task", verifyUserToken(["USER"]), taskRouter)


// health Checkup
app.get("/health", (req, res) => {
  res.json(createResponse(true, "server running fine"));
});