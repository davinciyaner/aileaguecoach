"use client";
import React, { useState, useEffect } from "react";
import { Mail } from "lucide-react";

import { useLanguage } from "@/context/LanguageContext";
import deTranslations from '@/locales/de/common.json';
import enTranslations from '@/locales/en/common.json';

export default function Footer() {
    const { language } = useLanguage();
    const t = (key) => (language === "de" ? deTranslations[key] : enTranslations[key]);

    const [email, setEmail] = useState("");
    const [subscribed, setSubscribed] = useState(false);
    const [message, setMessage] = useState("");
    const [messageColor, setMessageColor] = useState("");
    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    const handleSubscribe = async (event) => {
        event.preventDefault();
        if (!email) return setMessage(t("footer_email_invalid"));

        try {
            const res = await fetch(`${API_URL}/newsletter`, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({email}),
            });
            const data = await res.json();

            if (res.ok) {
                setSubscribed(true);
                setMessageColor("text-green-500");
                setMessage(t("footer_subscribe_success"));
            } else {
                setMessageColor("text-red-500");
                setMessage(data.message || t("footer_subscribe_error"));
            }
        } catch (err) {
            console.error(err);
            setMessageColor("text-red-500");
            setMessage(t("footer_generic_error"));
        }
    };

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
                setMessage(t("footer_unsubscribe_success"));
            } else {
                setMessageColor("text-red-500");
                setMessage(data.message || t("footer_unsubscribe_error"));
            }
        } catch (err) {
            console.error(err);
            setMessageColor("text-red-500");
            setMessage(t("footer_generic_error"));
        }
    };

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
                    <h2 className="text-2xl font-semibold text-white sm:text-3xl">{t("footer_newsletter_title")}</h2>
                    <p className="mt-4 text-gray-400">{t("footer_newsletter_desc")}</p>

                    {!subscribed ? (
                        <form className="mt-6 flex flex-col items-center max-w-md mx-auto gap-3" onSubmit={handleSubscribe}>
                            <div className="flex w-full gap-x-3">
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder={t("footer_email_placeholder")}
                                    className="min-w-0 flex-auto rounded-md border-0 bg-gray-800/50 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-gray-700 focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6"
                                />
                                <button
                                    type="submit"
                                    className="flex-none rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                                >
                                    {t("footer_subscribe_button")}
                                </button>
                            </div>
                            {message && (
                                <p className={`mt-2 text-sm ${messageColor}`}>{message}</p>
                            )}
                        </form>
                    ) : (
                        <div className="mt-6 flex flex-col items-center gap-3">
                            <span className="text-gray-300 px-3.5 py-2.5 rounded-md bg-gray-800/50">
                                {t("footer_subscribed_label")}: {email}
                            </span>
                            <button
                                onClick={handleUnsubscribe}
                                className="flex-none rounded-md bg-red-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-400 focus-visible:outline-offset-2 focus-visible:outline-red-500"
                            >
                                {t("footer_unsubscribe_button")}
                            </button>
                            {message && (
                                <p className={`mt-2 text-sm ${messageColor}`}>{message}</p>
                            )}
                        </div>
                    )}
                </div>

                <div className="border-t border-gray-800 pt-12 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="text-gray-400 text-sm text-center md:text-left">
                        © {new Date().getFullYear()} Hans AI Coach. {t("footer_copyright")}
                    </div>
                    <div className="flex space-x-6">
                        <a href="/privacy" className="text-gray-400 hover:text-indigo-400">{t("footer_privacy")}</a>
                        <a href="/legal-notice" className="text-gray-400 hover:text-indigo-400">{t("footer_legal")}</a>
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