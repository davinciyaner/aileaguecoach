import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

dotenv.config();

import authRoutes from "./routes/auth.routes.js";
import reviewsRoutes from "./routes/reviews.routes.js";
import profileRoutes from "./routes/profile.routes.js";
import downloadRoutes from "./routes/download.routes.js";
import subscriptionRoutes from "./routes/subscription.routes.js";
import newsletterRoutes from "./routes/newsletter.routes.js";

const app = express();

const PORT = process.env.PORT || 3001;


app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cookieParser());


const allowedOrigins = [process.env.CLIENT_URL].filter(Boolean);

app.use(cors({
    origin: 'https://aihanscoach.vercel.app',
    //origin: 'http://localhost:3000',
    methods: ['GET','POST','PUT','DELETE'],
    credentials: true
}));


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


app.get("/", (req, res) => {
    res.json({ message: "AI League Coach Backend läuft 🚀" });
});


app.use("/api/auth", authRoutes);
app.use("/api/subscribe", subscriptionRoutes);
app.use("/api/reviews", reviewsRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/download", downloadRoutes);
app.use("/api/newsletter", newsletterRoutes);


app.use("*", (req, res) => {
    res.status(404).json({ status: false, message: "Endpoint Not Found" });
});


const startServer = async () => {
    try {
        await mongoose.connect(process.env.DB_URL, { dbName: "AIleague" });
        console.log("MongoDB verbunden");

        app.listen(PORT, () => {
            console.log(`Server läuft auf Port ${PORT}`);
        });
    } catch (err) {
        console.error("MongoDB Fehler:", err);
    }
};

startServer();