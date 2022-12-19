import { BadRequestError, UnauthenticatedError } from "../../errors/index.js";
import { Request, Response } from "express";
import PostService from "./post.service.js";

const service = new PostService();

export async function createPost(req: Request, res: Response) {
  const user = req.user;

  req.body.createdBy = user._id;

  const post = await service.createPost({ ...req.body });
  res.status(201).json({ status: "success", post });
}

export async function getAllPosts(req: Request, res: Response) {
  const posts = await service.getAllPosts();
  res.status(200).json({ status: "success", count: posts.length, data: posts });
}

export async function likePost(req: Request, res: Response) {
  const user = req.user;
  const { type, postId } = req.body;

  if (type != "post") {
    throw new BadRequestError("unexpected type for like post");
  }

  if (!postId) {
    throw new BadRequestError("postId is required");
  }

  req.body.userId = user._id;
  const like = await service.likePost({ ...req.body });
  if (!like) {
    throw new BadRequestError("unable to like post");
  }
  res.status(200).json({ status: "success", like });
}