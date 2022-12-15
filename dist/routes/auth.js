import { login, register } from "../controllers/auth.js";
import { loginValidation, registerValidation } from "../validation/auth.js";
import express from "express";
import validationMiddleware from "../middleware/validation_middleware.js";
const router = express.Router();
router.post("/login", validationMiddleware(loginValidation), login);
router.post("/register", validationMiddleware(registerValidation), register);
export default router;
//# sourceMappingURL=auth.js.map