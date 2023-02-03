import express from "express";
import postRoutes from "./post.js"
import userRoutes from "./user.js"

const router = express.Router();

router.use("/users", userRoutes);
// router.use("/posts",authenticateUser, postRoutes);
router.use("/posts", postRoutes);


export default router;