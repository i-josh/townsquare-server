import Post from "../models/post.js";
import { BadRequestError, UnauthenticatedError } from "../errors/index.js";
import { Request, Response } from "express";

export const createPost = async (req: Request, res: Response) => {
  const user = req.user;

  if (!user) {
    throw new BadRequestError("User not found");
  }

  req.body.createdBy = user._id;

  const post: any = await Post.create({ ...req.body });
  res.status(201).json({ post });
};
