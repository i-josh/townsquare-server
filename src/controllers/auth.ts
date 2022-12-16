import User from "../models/user.js";
import { BadRequestError, UnauthenticatedError } from "../errors/index.js";
import { Request, Response } from "express";

export const register = async (req: Request, res: Response) => {
  const user: any = await User.create({ ...req.body });
  const token = user.createJWT();
  res.status(201).json({ user, token });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("please provide email and password");
  }
  const user: any = await User.findOne({ email });

  if (!user) {
    throw new UnauthenticatedError("Invalid credentials");
  }

  const isPasswordValid = await user.validatePassword(password);

  if (!isPasswordValid) {
    throw new UnauthenticatedError("Password is not correct");
  }

  const token = user.createJWT();
  res.status(200).json({ user, token });
};
