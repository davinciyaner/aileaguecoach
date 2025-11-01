"use client";
import React, { useEffect, useState } from "react";
import Navbar from "@/components/navbar/Navbar";

export default function Downloads() {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await fetch("http://localhost:3001/api/download/stats");
                const data = await res.json();
                setStats(data?.windows || null); // 👈 nur Windows-Daten erwarten
            } catch (err) {
                console.error("Error loading download stats:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    if (loading)
        return <div className="text-center text-gray-300 mt-20">Loading...</div>;

    return (
        <main className="flex flex-col items-center justify-center min-h-screen bg-[#0f0f14] text-white p-8">
            <div className="mt-20">
                <Navbar minimal={true}/>
            </div>
            <h1 className="text-4xl font-bold mb-4 text-indigo-400">Download AILC Coach</h1>
            <p className="text-gray-400 mb-10 max-w-2xl text-center">
                Lade die neueste Version herunter und starte deine Reise mit dem AI League Coach.
            </p>

            {/* Download Button */}
            <div className="text-center">
                <a
                    href="http://localhost:3001/api/download/windows"
                    className="px-10 py-4 bg-indigo-600 hover:bg-indigo-500 rounded-xl text-lg font-semibold transition-all duration-200"
                >
                    ⬇️ Download for Windows
                </a>

                {stats ? (
                    <p className="text-gray-400 text-sm mt-5">
                        Version {stats.version} · Released {stats.releaseDate} ·{" "}
                        <span className="text-indigo-300">{stats.downloads}</span> downloads
                    </p>
                ) : (
                    <p className="text-gray-500 text-sm mt-3">
                        Version 0.1.0-alpha.1
                    </p>
                )}
            </div>

            {/* Optional: System requirements */}
            <div className="mt-12 max-w-xl text-center text-gray-400 text-sm leading-relaxed">
                <h2 className="text-lg text-indigo-400 mb-2 font-semibold">Systemanforderungen</h2>
                <p>• Windows 10 oder höher (64-bit)</p>
                <p>• Mindestens 4 GB RAM und 500 MB freier Speicherplatz</p>
                <p>• Internetverbindung für KI-Modelle erforderlich</p>
            </div>

            <div className="mt-16 text-sm text-gray-500">
                © {new Date().getFullYear()} AI League Coach — All rights reserved.
            </div>
        </main>
    );
}
