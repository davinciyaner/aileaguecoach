import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import Download from "../models/download.model.js";
import {sendDownloadEmail} from "../../receivedownloadmail.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Liefert die aktuellen Windows-Download-Stats aus MongoDB
export const getDownloadStats = async (req, res) => {
    try {
        let stats = await Download.findOne({});
        if (!stats) {
            // Falls noch kein Eintrag existiert, initialisieren
            stats = await Download.create({
                version: "0.1.1-Beta.1",
                releaseDate: new Date("2025-11-17"),
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
    const githubUrl = "https://github.com/davinciyaner/aileaguecoach/releases/download/v0.1.2/main.exe";

    try {
        let stats = await Download.findOne({});
        if (!stats) {
            stats = await Download.create({
                version: "0.0.1",
                releaseDate: new Date(),
                downloads: 1,
            });
        } else {
            stats.downloads += 1;
            await stats.save();
        }

        sendDownloadEmail({
            version: stats.version,
            ip: req.ip
        }).catch(err => console.error("Error sending download email:", err));

        return res.redirect(githubUrl);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Fehler beim Starten des Downloads" });
    }
};

