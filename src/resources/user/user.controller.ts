import { BadRequestError, UnauthenticatedError } from "../../errors/index.js";
import { Request, Response } from "express";
import UserService from "./user.service.js";

const service = new UserService();

export async function register(req: Request, res: Response) {
  const user = await service.register({ ...req.body });
  const token = user.createJWT();
  res.status(201).json({ status: "success", user, token });
}

export async function login(req: Request, res: Response) {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("please provide email and password");
  }
  const user = await service.getUser(email);

  if (!user) {
    throw new UnauthenticatedError("Invalid credentials");
  }

  const isPasswordValid = await user.validatePassword(password);

  if (!isPasswordValid) {
    throw new UnauthenticatedError("Password is not correct");
  }

  const token = user.createJWT();
  res.status(200).json({ status: "success", user, token });
}
