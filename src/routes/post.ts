import {
  addComment,
  createPost,
  getAllPosts,
  getComments,
  likePost,
} from "../resources/post/post.controller.js";
import { createPostValidation } from "../resources/post/post.validation.js";
import {
  addCommentValidation,
  getCommentsValidation,
} from "../resources/comment/comment.validation.js";
import express from "express";
import validationMiddleware from "../middleware/validation_middleware.js";
import authenticateUser from "../middleware/authentication.js";

const router = express.Router();

//create post
router.post(
  "/create",
  validationMiddleware(createPostValidation),
  authenticateUser,
  createPost
);
//get all posts
router.get("/", getAllPosts);

//like post
router.post("/like", authenticateUser, likePost);

//comment on post
router.post(
  "/comment",
  validationMiddleware(addCommentValidation),
  authenticateUser,
  addComment
);

//get all comments for post
router.get(
  "/comments",
  validationMiddleware(getCommentsValidation),
  getComments
);

export default router;
