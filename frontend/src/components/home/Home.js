'use client'

import Image from 'next/image';
import Head from "next/head";
import { useAuth } from "@/context/AuthContext";
import Navbar from "../navbar/Navbar";

// Importiere die Übersetzungen direkt
import { useLanguage } from "@/context/LanguageContext";
import deTranslations from '@/locales/de/common.json';
import enTranslations from '@/locales/en/common.json';


export default function Home() {
    const { user } = useAuth();

    const { language } = useLanguage();
    const t = (key) => {
        const translations = language === 'de' ? deTranslations : enTranslations;
        return translations[key] || key; // fallback falls Key fehlt
    };


    return (
        <>
            {/* Meta-Tags und SEO */}
            <Head>
                <title>{t("seo_title")}</title>
                <meta name="description" content={t("seo_description")} />
                <meta name="keywords" content={t("seo_keywords")} />
                <meta name="author" content="League of Legends AI Team"/>
                <meta name="robots" content="index, follow"/>
                <meta name="language" content={language}/>

                <meta property="og:title" content={t("seo_title")} />
                <meta property="og:description" content={t("seo_description")} />
                <meta property="og:image" content="/preview.png"/>
                <meta property="og:url" content="https://aihanscoach.vercel.app/"/>
                <meta property="og:type" content="website"/>
                <meta property="og:locale" content={language === 'de' ? 'de_DE' : 'en_US'}/>

                <meta name="twitter:card" content="summary_large_image"/>
                <meta name="twitter:title" content={t("seo_title")} />
                <meta name="twitter:description" content={t("seo_description")} />
                <meta name="twitter:image" content="/preview.png"/>

                <link rel="canonical" href="https://aihanscoach.vercel.app/"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <div className="bg-gray-900 min-h-screen relative">
                <Navbar />

                <main className="relative isolate px-6 pt-14 lg:px-8">
                    <section className="mx-auto max-w-6xl py-32 sm:py-48 lg:py-56 grid grid-cols-1 lg:grid-cols-2 items-center gap-16">
                        <div className="text-center lg:text-left">
                            <div className="hidden sm:mb-8 sm:flex sm:justify-center lg:justify-start">
                                <div className="relative rounded-full px-3 py-1 text-sm text-gray-400 ring-1 ring-white/50">
                                    {t("beta")}
                                </div>
                            </div>

                            <h1 className="text-5xl font-semibold tracking-tight text-white sm:text-7xl">
                                {t("headline")}
                            </h1>

                            <p className="mt-8 text-lg text-gray-400 sm:text-xl">
                                {t("subtext")}
                            </p>

                            <div className="mt-10 flex justify-center lg:justify-start gap-x-6">
                                <a
                                    href="/download"
                                    className="rounded-md bg-indigo-500 px-6 py-3 text-white font-semibold text-sm shadow hover:bg-indigo-400 transition"
                                >
                                    {t("start_now")}
                                </a>
                            </div>
                        </div>

                        <div className="flex justify-center lg:justify-end">
                            <Image
                                src="/homepictures/hansai.PNG"
                                alt={t("headline")}
                                width={1200}
                                height={675}
                                className="rounded-lg shadow-lg"
                            />
                        </div>
                    </section>
                </main>
            </div>
        </>
    );
}