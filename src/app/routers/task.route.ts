import { Router } from "express"
import { validateInput } from "../middlewares/validateInput"
import { taskSchema, taskUpdateSchema } from "../validation/task.validation"
import { verifyUserToken } from "../middlewares/verifyUserToken"
import { createTask, deleteTask, getTasks, updateTask } from "../controllers/task.controller"



export const taskRouter = Router()


taskRouter.get("/", getTasks)
// 
taskRouter.post("/", validateInput(taskSchema), createTask)
// 
taskRouter.put("/:id", validateInput(taskUpdateSchema), updateTask)
// 
taskRouter.delete("/:id", deleteTask)