"use client";
import React, { useState, useEffect } from "react";
import { Mail } from "lucide-react";

export default function Footer() {
    const [email, setEmail] = useState("");
    const [subscribed, setSubscribed] = useState(false);
    const [message, setMessage] = useState("");
    const [messageColor, setMessageColor] = useState("");
    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    // Newsletter abonnieren
    const handleSubscribe = async (event) => {
        event.preventDefault();
        if (!email) return setMessage("Bitte gib eine gültige E-Mail-Adresse ein.");

        try {
            const res = await fetch(`${API_URL}/api/newsletter/newsletter`, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({email}),
            });
            const data = await res.json();

            if (res.ok) {
                setSubscribed(true);
                setMessageColor("text-green-500");
                setMessage("✅ Erfolgreich für den Newsletter angemeldet!");
            } else {
                setMessageColor("text-red-500");
                setMessage(data.message || "Fehler bei der Anmeldung.");
            }
        } catch (err) {
            console.error(err);
            setMessageColor("text-red-500");
            setMessage("Etwas ist schiefgelaufen. Bitte versuche es erneut.");
        }
    };

    // Newsletter abbestellen
    const handleUnsubscribe = async () => {
        if (!email) return;
        try {
            const res = await fetch(
                `${API_URL}/api/newsletter/unsubscribe?email=${encodeURIComponent(email)}`
            );
            const data = await res.json();

            if (res.ok) {
                setSubscribed(false);
                setMessageColor("text-green-500");
                setMessage("✅ Erfolgreich abgemeldet.");
            } else {
                setMessageColor("text-red-500");
                setMessage(data.message || "Fehler bei der Abmeldung.");
            }
        } catch (err) {
            console.error(err);
            setMessageColor("text-red-500");
            setMessage("Etwas ist schiefgelaufen. Bitte versuche es erneut.");
        }
    };

    // Automatische Abmeldung per Query
    useEffect(() => {
        const queryEmail = new URLSearchParams(window.location.search).get("email");
        if (queryEmail) {
            setEmail(queryEmail);
            handleUnsubscribe();
        }
    }, []);

    return (
        <footer className="bg-gray-950 border-t border-gray-800">
            <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
                <div className="mx-auto max-w-3xl text-center mb-16">
                    <h2 className="text-2xl font-semibold text-white sm:text-3xl">
                        Bleibe mit Hans AI immer auf dem Laufenden
                    </h2>
                    <p className="mt-4 text-gray-400">
                        Abonniere unseren Newsletter für exklusive Updates, frühen Zugang zu neuen Funktionen
                        und Coaching-Tipps direkt von unserem KI-Coach.
                    </p>

                    {!subscribed ? (
                        <form className="mt-6 flex flex-col items-center max-w-md mx-auto gap-3"
                              onSubmit={handleSubscribe}>
                            <div className="flex w-full gap-x-3">
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="E-Mail-Adresse eingeben"
                                    className="min-w-0 flex-auto rounded-md border-0 bg-gray-800/50 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-gray-700 focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6"
                                />
                                <button
                                    type="submit"
                                    className="flex-none rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                                >
                                    Abonnieren
                                </button>
                            </div>
                            {message && (
                                <p className={`mt-2 text-sm ${messageColor}`}>{message}</p>
                            )}
                        </form>
                    ) : (
                        <div className="mt-6 flex flex-col items-center gap-3">
              <span className="text-gray-300 px-3.5 py-2.5 rounded-md bg-gray-800/50">
                Abonniert: {email}
              </span>
                            <button
                                onClick={handleUnsubscribe}
                                className="flex-none rounded-md bg-red-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-400 focus-visible:outline-offset-2 focus-visible:outline-red-500"
                            >
                                Abbestellen
                            </button>
                            {message && (
                                <p className={`mt-2 text-sm ${messageColor}`}>{message}</p>
                            )}
                        </div>
                    )}
                </div>

                <div
                    className="border-t border-gray-800 pt-12 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="text-gray-400 text-sm text-center md:text-left">
                        © {new Date().getFullYear()} Hans AI Coach. Alle Rechte vorbehalten.
                    </div>

                    <div className="flex space-x-6">
                        <a href="/privacy" className="text-gray-400 hover:text-indigo-400">
                            Datenschutzerklärung
                        </a>
                        <a href="/legal-notice" className="text-gray-400 hover:text-indigo-400">
                            Impressum
                        </a>
                        <a href="https://discord.gg/4ecd9TvCmU" className="text-gray-400 hover:text-indigo-400">
                            <img src="/icons/Discord-Symbol-White.png" alt="Discord" className="w-8 h-6"/>
                        </a>
                        <a href="mailto:hansleaguecoach@gmail.com" className="text-gray-400 hover:text-indigo-400">
                            <Mail className="h-5 w-5"/>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}