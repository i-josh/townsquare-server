import { BadRequestError, UnauthenticatedError } from "../errors/index.js";
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import User from "../resources/user/user.model.js";

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
      throw new UnauthenticatedError("Unauthorized");
    }
    req.user = user;
    next();
  } catch (error) {       
    throw new BadRequestError(error.message);
  }
};

export default auth;
