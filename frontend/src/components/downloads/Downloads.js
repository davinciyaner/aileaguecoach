"use client";
import React, { useEffect, useState } from "react";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";

import { useLanguage } from "@/context/LanguageContext";
import deTranslations from '@/locales/de/common.json';
import enTranslations from '@/locales/en/common.json';

export default function Downloads() {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    const { language } = useLanguage();
    const t = (key) => {
        const translations = language === 'de' ? deTranslations : enTranslations;
        return translations[key] || key; // fallback falls Key fehlt
    };

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await fetch(`${API_URL}/api/download/stats`);
                const data = await res.json();
                setStats(data?.windows || null);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, [API_URL]);

    if (loading) return <div className="text-center text-gray-400 mt-20">{t('loading')}</div>;

    return (
        <div className="bg-gray-900 min-h-screen text-white">
            <Navbar minimal={true} />
            <main className="flex flex-col items-center justify-center px-6 py-20 sm:py-32">
                <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-indigo-400 text-center">
                    {t('downloadTitle')}
                </h1>
                <p className="text-gray-400 mb-10 max-w-2xl text-center">
                    {t('downloadText')}
                </p>

                <div className="text-center">
                    <a
                        href={`${API_URL}/api/download/windows`}
                        className="inline-block px-10 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl text-lg transition-all duration-200"
                    >
                        {t('downloadButton')}
                    </a>

                    {stats ? (
                        <p className="text-gray-400 text-sm mt-5">
                            {t('versionInfo', {
                                version: stats.version,
                                releaseDate: stats.releaseDate,
                                downloads: stats.downloads
                            })}
                        </p>
                    ) : (
                        <p className="text-gray-500 text-sm mt-3">Version 0.1.1-Beta.1</p>
                    )}
                </div>

                <div className="mt-12 max-w-xl text-center text-gray-400 text-sm leading-relaxed">
                    <h2 className="text-lg text-indigo-400 mb-2 font-semibold">{t('systemRequirements')}</h2>
                    <ul className="list-disc list-inside space-y-1">
                        <li>{t('requirement1')}</li>
                        <li>{t('requirement2')}</li>
                    </ul>
                </div>
            </main>
            <Footer />
        </div>
    );
}