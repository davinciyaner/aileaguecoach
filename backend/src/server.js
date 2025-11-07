import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

dotenv.config();

console.log(">>> ENV PORT:", process.env.PORT);

import authRoutes from "./routes/auth.routes.js";
import reviewsRoutes from "./routes/reviews.routes.js";
import profileRoutes from "./routes/profile.routes.js";
import downloadRoutes from "./routes/download.routes.js";
import subscriptionRoutes from "./routes/subscription.routes.js";

const app = express();

const PORT = process.env.PORT || 8080;


app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cookieParser());


const allowedOrigins = [process.env.CLIENT_URL].filter(Boolean);

app.use(
    cors({
        origin: (origin, callback) => {
            if (!origin) return callback(null, true); // mobile apps / Postman
            if (allowedOrigins.includes(origin)) {
                return callback(null, true);
            }
            callback(new Error("CORS policy does not allow access from this origin"));
        },
        credentials: true,
    })
);


app.use("/api/auth", authRoutes);
app.use("/api/subscribe", subscriptionRoutes);
app.use("/api/reviews", reviewsRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/download", downloadRoutes);


app.use("*", (req, res) => {
    res.status(404).json({ status: false, message: "Endpoint Not Found" });
});


const startServer = async () => {
    try {
        await mongoose.connect(process.env.DB_URL, { dbName: "AIleague" });
        console.log("✅ MongoDB verbunden");

        app.listen(PORT, () => {
            console.log(`✅ Server läuft auf Port ${PORT}`);
        });
    } catch (err) {
        console.error("❌ MongoDB Fehler:", err);
    }
};

startServer();