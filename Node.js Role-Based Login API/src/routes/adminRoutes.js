import express from "express";
import {
  authenticateJWT,
  authorizeRole,
} from "../middleware/jwt.middleware.js";
import adminController from "../controllers/admin.controller.js";

const router = express.Router();

router.get(
  "/dashboard",
  authenticateJWT,
  authorizeRole(["admin"]),
  adminController.getAllUsers,
);

export default router;
