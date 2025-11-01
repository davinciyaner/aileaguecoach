import express from 'express';
import {subscribeNewsletter, unsubscribeNewsletter} from "../controllers/newsletter.controller.js";



const router = express.Router();

router.post('/newsletter', subscribeNewsletter)
router.get("/unsubscribe", unsubscribeNewsletter);

export default router;