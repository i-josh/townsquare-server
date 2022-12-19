import { login, register } from "../resources/user/user.controller.js";
import { loginValidation, registerValidation } from "../resources/user/user.validation.js";
import express from "express";
import validationMiddleware from "../middleware/validation_middleware.js";

const router = express.Router();

router.post("/login", validationMiddleware(loginValidation), login);
router.post("/register", validationMiddleware(registerValidation), register);

export default router;
