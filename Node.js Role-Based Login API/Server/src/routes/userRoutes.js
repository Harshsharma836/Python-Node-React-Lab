import express from "express";
import userController from "../controllers/userController.js";
import { authenticateJWT } from "../middleware/jwt.middleware.js";
import {
  validateRegistration,
  validateLogin,
} from "../middleware/validationMiddleware.js";

const router = express.Router();

router.post("/register", validateRegistration, userController.registerUser);
router.post("/login", validateLogin, userController.loginUser);

router.get("/profile", authenticateJWT, userController.getUserProfile);

export default router;
