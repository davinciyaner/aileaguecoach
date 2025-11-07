// src/models/Download.js
import mongoose from "mongoose";

const downloadSchema = new mongoose.Schema({
    version: { type: String, required: true },
    releaseDate: { type: Date, required: true },
    downloads: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.models.Download || mongoose.model("Download", downloadSchema);