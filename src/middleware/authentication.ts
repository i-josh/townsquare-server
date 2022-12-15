import { UnauthenticatedError } from "../errors/index.js";
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import User from "../models/user.js";

const auth = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    throw new UnauthenticatedError("Unauthorized");
  }

  const token: string = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById((payload as jwt.JwtPayload).userId).select(
      "-password"
    );
    if (!user) {
      throw new UnauthenticatedError("unauthorized");
    }
    req.user = user;
    next();
  } catch (error) {
    throw new UnauthenticatedError("unauthorized");
  }
};

export default auth;
