import express from "express";
import userController from "../controllers/userController.js";
import { authenticateJWT, authorizeRole } from "../middleware/jwt.middleware.js";
import userService from "../services/userService.js";

const router = express.Router();

router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);

router.get("/profile", authenticateJWT ,(req, res) => {
    res.json({ message: "This is a user profile route" });
});

export default router;
