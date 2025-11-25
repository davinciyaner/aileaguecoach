import express from "express";
import { getDownloadStats, downloadWindows } from "../controllers/download.controller.js";
import { downloadLimiter } from "../middleware/ratelimits.js";

const router = express.Router();

// Rate limiter muss **vor** dem Handler stehen
router.get("/stats", getDownloadStats);
router.get("/windows", downloadLimiter, downloadWindows);

export default router;
