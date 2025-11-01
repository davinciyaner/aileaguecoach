import express from "express";
import {captureOrder, createOrder} from "../controllers/order.controller.js";


const router = express.Router();

router.post("/orders/create", createOrder);
router.post("/orders/capture", captureOrder);

export default router;