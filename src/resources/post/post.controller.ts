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

export async function updatePost(req: Request, res: Response) {
  const user = req.user;

  const userId = user._id;
  const { postId } = req.body;

  if (!postId) {
    throw new BadRequestError("post id is required");
  }

  const post = await service.updatePost(req.body, postId, userId);
  if (!post) {
    throw new BadRequestError("post not updated");
  }
  res.status(200).json({ status: "success", post });
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

export async function addComment(req: Request, res: Response) {
  const user = req.user;
  req.body.userId = user._id;

  const comment = await service.addComment({ ...req.body });
  res.status(201).json({ status: "success", comment });
}

export async function getComments(req: Request, res: Response) {
  const postId: any = req.params.id;

  const comments = await service.getComments(postId);
  res.status(200).json({ status: "success", count: comments.length, comments });
}

export async function incrementViews(req: Request, res: Response) {
  const postId: any = req.params.id;

  await service.incrementViews(postId);
  res.status(200).json({ status: "success" });
}

export async function getPost(req: Request, res: Response) {
  const postId: any = req.params.id;
  const post = await service.getPost(postId);
  if (!post) {
    throw new BadRequestError("cant get post");
  }
  res.status(200).json({ status: "success", post });
}

export async function getPostWithCategory(req: Request, res: Response) {
  const category: string = req.params.category;
  const posts = await service.getPostWithCategory(category);
  if (!posts) {
    throw new BadRequestError("cant get posts");
  }
  res.status(200).json({ status: "success", count: posts.length, data: posts });
}
