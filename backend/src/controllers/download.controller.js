import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let downloadStats = {
    windows: {
        version: "0.1.0-alpha.1",
        releaseDate: "2025-10-31",
        downloads: 0,
    },
};

export const getDownloadStats = async (req, res) => {
    return res.status(200).json(downloadStats);
};

export const downloadWindows = async (req, res) => {
    const filePath = path.join(__dirname, "..", "..", "downloads", "main.exe");

    if (!fs.existsSync(filePath)) {
        return res.status(404).json({ message: "File not found" });
    }

    downloadStats.windows.downloads += 1;
    res.download(filePath, "main.exe");
};
