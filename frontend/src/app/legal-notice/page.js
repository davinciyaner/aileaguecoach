"use client";

import React from "react";
import Navbar from "../../components/navbar/Navbar";
import { useTranslation } from "react-i18next";
import {useLanguage} from "@/context/LanguageContext";
import deTranslations from "@/locales/de/common.json";
import enTranslations from "@/locales/en/common.json";

const LegalNotice = () => {
    const { language } = useLanguage();
    const t = (key) => {
        const translations = language === 'de' ? deTranslations : enTranslations;
        return translations[key] || key; // fallback falls Key fehlt
    };

    const year = new Date().getFullYear();


    return (
        <div className="min-h-screen bg-gray-900 text-gray-100">
            <Navbar minimal={true} />

            <main className="max-w-3xl mx-auto px-6 py-16">
                <h1 className="text-4xl font-bold text-white mb-6">{t("legalTitle")}</h1>
                <p className="text-gray-400 mb-12">{t("legalIntro")}</p>

                <section className="space-y-6 text-gray-300 leading-relaxed">
                    <div>
                        <h2 className="text-xl font-semibold text-indigo-400 mb-2">{t("responsibleTitle")}</h2>
                        <p className="whitespace-pre-line">{t("responsibleText")}</p>
                    </div>

                    <div>
                        <h2 className="text-xl font-semibold text-indigo-400 mb-2">{t("contactTitle")}</h2>
                        <p className="whitespace-pre-line">{t("contactText")}</p>
                    </div>

                    <div>
                        <h2 className="text-xl font-semibold text-indigo-400 mb-2">{t("companyTitle")}</h2>
                        <p className="whitespace-pre-line">{t("companyText")}</p>
                    </div>

                    <div>
                        <h2 className="text-xl font-semibold text-indigo-400 mb-2">{t("disclaimerTitle")}</h2>
                        <p className="whitespace-pre-line">{t("disclaimerText")}</p>
                    </div>
                </section>

                <footer className="mt-16 text-sm text-gray-500 border-t border-gray-800 pt-6 text-center">
                    {t("copyrightText", { year })}
                </footer>
            </main>
        </div>
    );
};

export default LegalNotice;