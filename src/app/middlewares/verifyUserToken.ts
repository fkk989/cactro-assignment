import { createResponse } from "../../utils/helpers";
import { AuthenticatedRequest, ROLES } from "../../utils/types";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;




export const verifyUserToken = (allowedRoles: ROLES[]) => ((
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const tokne = req.headers.authorization;

  if (!tokne) {
    res.status(401).json({ message: "Missing Authorization header. Use format: 'Bearer <your-token>'." });
    return
  }

  if (!tokne.startsWith("Bearer")) {
    res.status(401).json({ message: "Ivalid token format. Use format: 'Bearer <your-token>'." });
    return
  }



  const token = tokne.split(" ")[1];

  try {
    const userInfo = jwt.verify(token, JWT_SECRET) as AuthenticatedRequest["user"]

    if (!userInfo) {
      res.status(400).json(createResponse(false, "Invalid or expired token"))
      return
    }

    // adding user info to the req to use in the next function
    req.user = userInfo;

    const hasAccess = allowedRoles.includes(userInfo.role);

    if (hasAccess) {
      next();
      return;
    }
    res.status(403).json(createResponse(false, "NOT AUTHORIZED"));


  } catch (error) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
})
