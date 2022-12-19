import {
  createPost,
  getAllPosts,
  likePost,
} from "../resources/post/post.controller.js";
import { createPostValidation } from "../resources/post/post.validation.js";
import express from "express";
import validationMiddleware from "../middleware/validation_middleware.js";
import authenticateUser from "../middleware/authentication.js";

const router = express.Router();

router.post(
  "/create",
  validationMiddleware(createPostValidation),
  authenticateUser,
  createPost
);
router.get("/all", getAllPosts);
router.post("/like", authenticateUser, likePost);

export default router;
