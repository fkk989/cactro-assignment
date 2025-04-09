import { Router } from "express"
import { validateInput } from "../middlewares/validateInput"
import { userLoginSchema, userSignupSchema } from "../validation/user.validation"
import { getUser, login, signup } from "../controllers/user.controller"
import { verifyUserToken } from "../middlewares/verifyUserToken"


export const userRouter = Router()

userRouter.post("/signup", validateInput(userSignupSchema), signup)

userRouter.post("/login", validateInput(userLoginSchema), login)

userRouter.get("/", verifyUserToken(["USER"]), getUser)