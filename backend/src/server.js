import mongoose from "mongoose";

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoutes from './routes/auth.routes.js';
import reviewsRoutes from "./routes/reviews.routes.js";
import profileRoutes from "./routes/profile.routes.js";
import downloadRoutes from "./routes/download.routes.js";
import subscriptionRoutes from "./routes/subscription.routes.js";

import dotenv from "dotenv";
dotenv.config();

// Instantiate an Express Application
const app = express();

const PORT = process.env.PORT || 3001;

// Configure Express App Instance
app.use(express.json( { limit: '50mb' } ));
app.use(express.urlencoded( { extended: true, limit: '10mb' } ));

// Configure custom logger middleware

app.use(cookieParser());
app.use(cors());

app.use(cors({
    origin: "http://localhost:3000", // erlaubt Anfragen vom Frontend
    credentials: true,
}));

// This middleware adds the json header to every response
app.use('*', (req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    next();
})

// Assign Routes

app.use('/api/auth', authRoutes);
app.use('/api/subscribe', subscriptionRoutes);
app.use("/api/reviews", reviewsRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/download", downloadRoutes);


// Handle not valid route
app.use('*', (req, res) => {
    res
    .status(404)
    .json( {status: false, message: 'Endpoint Not Found'} );
})

mongoose.connect(process.env.DB_URL)
    .then(() => console.log("MongoDB verbunden"))
    .catch(err => console.error("MongoDB Fehler:", err));

// Open Server on selected Port
app.listen(
    PORT,
    () => console.info('Server listening on port ', PORT)
);