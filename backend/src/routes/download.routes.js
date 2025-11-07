import express from "express";
import { getDownloadStats, downloadWindows } from "../controllers/download.controller.js";

const router = express.Router();

router.get("/stats", getDownloadStats);
router.get("/windows", downloadWindows);

export default router;