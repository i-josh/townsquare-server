import {
  addComment,
  createPost,
  getAllPosts,
  getComments,
  incrementViews,
  likePost,
  updatePost,
} from "../resources/post/post.controller.js";
import {
  createPostValidation,
  updatePostValidation,
} from "../resources/post/post.validation.js";
import { addCommentValidation } from "../resources/comment/comment.validation.js";
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
router.get("/comments/:id", getComments);

//update post
router.post(
  "/update",
  validationMiddleware(updatePostValidation),
  authenticateUser,
  updatePost
);

//increase views
router.get("/updateViews/:id", incrementViews);

export default router;
