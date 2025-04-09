import { Router } from "express"
import { validate } from "../middlewares/validate"
import { userLoginSchema, userSignupSchema } from "../validation/user.validation"
import { getUser, login, signup } from "../controllers/user.controller"
import { verifyUserToken } from "../middlewares/verifyUserToken"


export const userRouter = Router()

userRouter.post("/signup", validate(userSignupSchema), signup)

userRouter.post("/login", validate(userLoginSchema), login)

userRouter.get("/", verifyUserToken(["USER"]), getUser)