import express from "express";
import { authenticateJWT, authorizeRole } from "../middleware/jwt.middleware.js";

const router = express.Router();

router.get("/dashboard", authenticateJWT, authorizeRole(["admin"]), (req, res) => {
    res.json({ message: "This is an admin dashboard route" });
  });

export default router;
