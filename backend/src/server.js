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

// Railway setzt den PORT automatisch
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cookieParser());

// CORS konfigurieren
const allowedOrigins = [process.env.CLIENT_URL].filter(Boolean); // Nur definierte Origins

app.use(
    cors({
        origin: (origin, callback) => {
            if (!origin) return callback(null, true); // mobile apps, curl etc.
            if (allowedOrigins.length === 0 || allowedOrigins.includes(origin)) {
                return callback(null, true);
            }
            return callback(new Error("CORS policy does not allow access from this origin"), false);
        },
        credentials: true,
    })
);

// JSON Header für alle Responses
app.use((req, res, next) => {
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

// Funktion für DB-Verbindung + Serverstart
const startServer = async () => {
    try {
        await mongoose.connect(process.env.DB_URL, { dbName: "AIleague" });
        console.log("MongoDB verbunden");

        app.listen(PORT, () => {
            console.log(`Server läuft auf Port ${PORT}`);
        });
    } catch (err) {
        console.error("MongoDB Fehler:", err);
        // Container nicht beenden – Railway darf Healthcheck weiterhin prüfen
    }
};

// Server starten
startServer();