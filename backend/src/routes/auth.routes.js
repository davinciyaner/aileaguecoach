import express from "express";
import {forgotPassword, getMe, login, register, resetPassword} from "../controllers/auth.controller.js";
import {verifyToken} from "../middleware/auth.middleware.js";


const router = express.Router();

router.post("/register", register)
router.post("/login", login)
router.get("/me", verifyToken, getMe);
router.post("/forgot-password", forgotPassword);
router.post("/resetPassword", resetPassword);

export default router;