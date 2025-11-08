'use client'

import Head from "next/head";
import { useAuth } from "@/context/AuthContext";
import Navbar from "../navbar/Navbar";

export default function Home() {
    const { user } = useAuth();

    return (
        <>
            <Head>
                <title>League of Legends AI – Analysiere dein Spiel in Echtzeit</title>
                <meta
                    name="description"
                    content="Steige im Ranked mit KI-Unterstützung auf. Unsere League of Legends AI analysiert deine Spiele in Echtzeit, bewertet Objectives, Team Synergy und Meta-Trends."
                />
                <meta
                    name="keywords"
                    content="league of legends ai, lol live analysis, ranked climb, objective tracker, meta stats, champion synergy, lol coaching, lol improvement"
                />
                <meta name="author" content="League of Legends AI Team" />
                <meta name="robots" content="index, follow" />
                <meta name="language" content="de" />

                <meta property="og:title" content="League of Legends AI – Dein smarter Ranked Coach" />
                <meta
                    property="og:description"
                    content="Analysiere deine LoL-Spiele mit KI. Erhalte Live-Empfehlungen zu Objectives, Team-Synergie und aktuellen Meta-Champions."
                />
                <meta property="og:image" content="/preview.png" />
                <meta property="og:url" content="https://aihanscoach.vercel.app/" />
                <meta property="og:type" content="website" />
                <meta property="og:locale" content="de_DE" />

                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="League of Legends AI – KI für Ranked-Spieler" />
                <meta name="twitter:description" content="Verbessere dein Spiel mit Echtzeit-KI-Analyse, Meta-Daten & Champion-Synergie-Tracking." />
                <meta name="twitter:image" content="/preview.png" />

                <link rel="canonical" href="https://aihanscoach.vercel.app/" />

                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className="bg-gray-900 min-h-screen">
                <Navbar />

                <main className="relative isolate px-6 pt-14 lg:px-8">
                    <section className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56 text-center">
                        <div className="hidden sm:mb-8 sm:flex sm:justify-center">
                            <div className="relative rounded-full px-3 py-1 text-sm text-gray-400 ring-1 ring-white/50">
                                BETA VERSION
                            </div>
                        </div>

                        <h1 className="text-5xl font-semibold tracking-tight text-white sm:text-7xl">
                            Steige an die Spitze auf
                        </h1>

                        <p className="mt-8 text-lg text-gray-400 sm:text-xl">
                            Mit unserer KI war es noch nie so einfach, in League of Legends aufzusteigen
                            – analysiere Spiele in Echtzeit, erkenne Fehler und finde Synergien mit Champions, die zu dir passen.
                        </p>

                        <div className="mt-10 flex justify-center gap-x-6">
                            <a
                                href="/download"
                                className="rounded-md bg-indigo-500 px-6 py-3 text-white font-semibold text-sm shadow hover:bg-indigo-400 transition"
                            >
                                Jetzt starten
                            </a>
                        </div>
                    </section>
                </main>
            </div>
        </>
    );
}
