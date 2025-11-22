import path from "path";
import { fileURLToPath } from "url";
import Download from "../models/download.model.js";
import { sendDownloadEmail } from "../../receivedownloadmail.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Liefert die aktuellen Windows-Download-Stats aus MongoDB
export const getDownloadStats = async (req, res) => {
    try {
        let stats = await Download.findOne({});
        if (!stats) {
            // Falls noch kein Eintrag existiert, initialisieren
            stats = await Download.create({
                version: "0.1.2",
                releaseDate: new Date(),
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
        console.error("Error fetching download stats:", err);
        res.status(500).json({ message: "Fehler beim Abrufen der Download-Stats" });
    }
};

// Download für Windows
export const downloadWindows = async (req, res) => {
    const githubUrl = "https://github.com/davinciyaner/aileaguecoach/releases/download/v0.1.2/main.exe";

    try {
        // DB-Update in try/catch, blockiert den Request nicht
        try {
            let stats = await Download.findOne({});
            if (!stats) {
                stats = await Download.create({
                    version: "0.1.2",
                    releaseDate: new Date(),
                    downloads: 0,
                });
            } else {
                stats.downloads += 1;
                await stats.save();
            }

            // Mail fire-and-forget, Fehler nur loggen
            sendDownloadEmail({
                version: stats.version,
                ip: req.ip,
            }).catch(err => console.error("Error sending download email:", err));
        } catch (dbErr) {
            console.error("Database error during download:", dbErr);
        }

        // Redirect sofort zurückgeben, unabhängig von DB/Mail
        return res.redirect(githubUrl);
    } catch (err) {
        console.error("Error during download request:", err);
        res.status(500).json({ message: "Fehler beim Starten des Downloads" });
    }
};