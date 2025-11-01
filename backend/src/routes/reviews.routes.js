import express from "express";
import {createReview, getReviews, getStats} from "../controllers/reviews.controller.js";

const router = express.Router();

router.post("/", createReview);
router.get("/", getReviews);
router.get("/stats", getStats);

export default router;
