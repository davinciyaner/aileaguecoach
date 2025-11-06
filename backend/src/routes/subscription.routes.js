import express from "express";
import {cancelSubscription, createSubscription, handleWebhook} from "../controllers/subscription.controller.js";
const router = express.Router();

router.post("/create-subscription", createSubscription);
router.post("/cancel-subscription", cancelSubscription);
router.post("/paypal/webhook", handleWebhook);

export default router;
