// src/server.js
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

import authRoutes from "./routes/auth.routes.js";
import reviewsRoutes from "./routes/reviews.routes.js";
import profileRoutes from "./routes/profile.routes.js";
import downloadRoutes from "./routes/download.routes.js";
import subscriptionRoutes from "./routes/subscription.routes.js";

const app = express();

// PORT für Railway
const PORT = process.env.PORT;

// Middleware
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cookieParser());

// CORS konfigurieren
const allowedOrigins = [
    process.env.CLIENT_URL, // Vercel Frontend
];

app.use(
    cors({
        origin: (origin, callback) => {
            if (!origin) return callback(null, true); // mobile apps, curl etc.
            if (allowedOrigins.indexOf(origin) === -1) {
                return callback(new Error("CORS policy does not allow access from this origin"), false);
            }
            return callback(null, true);
        },
        credentials: true,
    })
);

// JSON Header für alle Responses
app.use("*", (req, res, next) => {
    res.setHeader("Content-Type", "application/json");
    next();
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/subscribe", subscriptionRoutes);
app.use("/api/reviews", reviewsRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/download", downloadRoutes);

// 404 Handler
app.use("*", (req, res) => {
    res.status(404).json({ status: false, message: "Endpoint Not Found" });
});

// MongoDB Verbindung
mongoose
    .connect("mongodb+srv://finnpaustian:9AlLYsWN1wM2wmyf@aileague.5togtll.mongodb.net/?retryWrites=true&w=majority&appName=AIleague", { dbName: "AIleague" })
    .then(() => console.log("MongoDB verbunden"))
    .catch((err) => {
        console.error("MongoDB Fehler:", err);
        process.exit(1); // Container stoppen, falls DB nicht erreichbar
    });

// Server starten
app.listen(PORT, () => {
    console.log(`Server läuft auf Port ${PORT}`);
});
