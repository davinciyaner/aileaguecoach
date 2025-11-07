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

// 🔧 Port – Railway nutzt automatisch seinen eigenen, lokal greift .env
const PORT = process.env.PORT || 8080;

// 🧩 Middleware
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cookieParser());

// 🌍 CORS
const allowedOrigins = [process.env.CLIENT_URL].filter(Boolean);
app.use(
    cors({
        origin: (origin, callback) => {
            if (!origin) return callback(null, true);
            if (allowedOrigins.length === 0 || allowedOrigins.includes(origin)) {
                return callback(null, true);
            }
            return callback(new Error("CORS policy does not allow access from this origin"), false);
        },
        credentials: true,
    })
);

// 🧠 Healthcheck (für Railway, UptimeRobot, Vercel etc.)
app.get("/health", async (req, res) => {
    const dbState = mongoose.connection.readyState;
    const dbStatus =
        dbState === 1 ? "connected" :
            dbState === 2 ? "connecting" :
                dbState === 0 ? "disconnected" : "disconnecting";

    res.status(200).json({
        status: "ok",
        uptime: process.uptime(),
        db: dbStatus,
        timestamp: new Date().toISOString(),
    });
});

// 🏁 Testroute
app.get("/", (req, res) => {
    res.json({ message: "AI League Coach Backend läuft 🚀" });
});

// 🔗 Routen
app.use("/api/auth", authRoutes);
app.use("/api/subscribe", subscriptionRoutes);
app.use("/api/reviews", reviewsRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/download", downloadRoutes);

// ⚠️ 404 Fallback
app.use("*", (req, res) => {
    res.status(404).json({ status: false, message: "Endpoint Not Found" });
});

// 🚀 Verbindung zur MongoDB + Serverstart
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