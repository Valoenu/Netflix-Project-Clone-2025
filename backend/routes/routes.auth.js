import express from "express";
import { signup, logout, login } from "../controllers/controller.auth.js";

// Create router
const router = express.Router();

// Create controller
router.post("/signup", signup);

router.post("/logout", logout);

router.post("/login", login);

export default router;
