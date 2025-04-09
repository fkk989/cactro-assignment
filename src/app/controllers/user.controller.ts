// 

import { Request, Response } from "express";
import { User } from "../../models/user.model";
import { createResponse, generateToken } from "../../utils/helpers";
import { TUserLoginInput, TUserSignupInput } from "../validation/user.validation";
import { AuthenticatedRequest, ROLES } from "../../utils/types";

// signup controller
export const signup = async (req: Request<{}, {}, TUserSignupInput>, res: Response) => {
  try {

    const { name, email, password } = req.body

    const userAlreadyExist = await User.findOne({ email: email.toLowerCase().trim() })

    if (userAlreadyExist) {
      res.status(400).json(createResponse(false, "User exists with this email", { errors: { email: "User exists with this email" } }))
      return;
    }

    const user = await User.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password: password.trim(),
    })

    user.password = ""

    res.status(200).json(createResponse(true, "User registered successfully please logIn now", {
      data: {
        user
      }
    }))

  } catch (e: any) {
    res.status(400).json(createResponse(false, `${e?.message}`))
  }

}

// login controller
export const login = async (req: Request<{}, {}, TUserLoginInput>, res: Response) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ email: email.toLowerCase().trim() })
    if (!user) {
      res.status(400).json(createResponse(false, "Incorrect Email", { errors: { email: "Incorrect Email" } }))
      return
    }


    // Comparing passowrd
    const isCorrectPassword = await user.comparePassword(password.trim(), user.password)

    if (!isCorrectPassword) {
      res.status(400).json(createResponse(false, "Incorrect Password", { errors: { password: "Incorrect Password" } }))
      return
    }


    // generating user token for authentication
    const token = generateToken({ id: user.id, name: user.name, email: user.email, role: (user.role as ROLES) })

    // deleting user sensitive data
    user.password = ""

    res.status(200).json(createResponse(true, "logged in successfully", { data: { user }, token }))
    return;
  } catch (e: any) {
    res.status(400).json(createResponse(false, `${e?.message}`))
  }
}

// get user controller

export const getUser = async (req: AuthenticatedRequest<{}, {}, TUserLoginInput>, res: Response) => {
  try {
    const userId = req.user?.id!

    const user = await User.findById(userId).select("_id id name email")

    if (!user) {
      res.status(400).json(createResponse(false, "User not found"))
      return
    }

    res.status(200).json(createResponse(true, "User fetched successfully", { data: { user } }))

  } catch (e: any) {
    res.status(400).json(createResponse(false, `${e?.message}`))
  }
}