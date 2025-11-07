import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import Download from "../models/download.model.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Liefert die aktuellen Windows-Download-Stats aus MongoDB
export const getDownloadStats = async (req, res) => {
    try {
        let stats = await Download.findOne({});
        if (!stats) {
            // Falls noch kein Eintrag existiert, initialisieren
            stats = await Download.create({
                version: "0.1.0-Beta.1",
                releaseDate: new Date("2025-11-08"),
                downloads: 0,
            });
        }

        res.status(200).json({
            windows: {
                version: stats.version,
                releaseDate: stats.releaseDate.toISOString().split("T")[0],
                downloads: stats.downloads,
            },
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Fehler beim Abrufen der Download-Stats" });
    }
};

// Download für Windows
export const downloadWindows = async (req, res) => {
    const filePath = path.join(__dirname, "..", "..", "downloads", "main.exe");

    if (!fs.existsSync(filePath)) {
        return res.status(404).json({ message: "Datei nicht gefunden." });
    }

    try {
        let stats = await Download.findOne({});
        if (!stats) {
            stats = await Download.create({
                version: "0.1.0-Beta.1",
                releaseDate: new Date("2025-11-06"),
                downloads: 1,
            });
        } else {
            stats.downloads += 1;
            await stats.save();
        }

        res.download(filePath, "main.exe");
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Fehler beim Starten des Downloads" });
    }
};
