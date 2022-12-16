import { createPost } from "../controllers/post.js";
import { createPostValidation } from "../validation/post.js";
import express from "express";
import validationMiddleware from "../middleware/validation_middleware.js";

const router = express.Router();

router.post("/create", validationMiddleware(createPostValidation), createPost);

export default router;
