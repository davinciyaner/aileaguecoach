'use client'

import React from "react";
import { motion } from "framer-motion";
import { Brain, TrendingUp, Target, Zap } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

// Übersetzungen aus src/locales importieren
import deTranslations from "@/locales/de/common.json";
import enTranslations from "@/locales/en/common.json";

export default function Features() {
    const { language } = useLanguage();
    const t = (key) => {
        const translations = language === 'de' ? deTranslations : enTranslations;
        return translations[key] || key; // fallback falls Key fehlt
    };

    // Features dynamisch aus Übersetzungen
    const features = [
        { name: t("feature_ki_analysis_name"), description: t("feature_ki_analysis_desc"), icon: Brain },
        { name: t("feature_progress_name"), description: t("feature_progress_desc"), icon: TrendingUp },
        { name: t("feature_champion_advice_name"), description: t("feature_champion_advice_desc"), icon: Target },
        { name: t("feature_live_coaching_name"), description: t("feature_live_coaching_desc"), icon: Zap },
    ];

    const container = {
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { staggerChildren: 0.2 } },
    };

    const item = {
        hidden: { opacity: 0, y: 40 },
        show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
    };

    return (
        <section className="relative bg-[#0a0a0f] py-24 sm:py-32 overflow-hidden">
            <div id="features" className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-transparent to-indigo-500/10 pointer-events-none" />

            <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
                {/* Überschrift */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="mx-auto max-w-2xl text-center"
                >
                    <h2 className="text-sm font-semibold text-indigo-400 tracking-wide uppercase">
                        {t("features_title_small")}
                    </h2>
                    <p className="mt-2 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                        {t("features_title_big")}
                    </p>
                    <p className="mt-6 text-lg text-gray-400">{t("features_description")}</p>
                </motion.div>

                {/* Feature-Grid */}
                <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.3 }}
                    className="mx-auto mt-16 grid max-w-4xl grid-cols-1 gap-10 sm:grid-cols-2 lg:gap-16"
                >
                    {features.map((feature) => (
                        <motion.div
                            key={feature.name}
                            variants={item}
                            whileHover={{ scale: 1.03, boxShadow: "0 0 20px rgba(99, 102, 241, 0.25)" }}
                            className="relative rounded-2xl bg-[rgba(31,41,55,0.4)] backdrop-blur-sm p-8 shadow-lg border border-white/10 transition-all"
                        >
                            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-500/20 text-indigo-400 mb-6">
                                <feature.icon className="h-6 w-6" />
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-2">{feature.name}</h3>
                            <p className="text-gray-400 text-base">{feature.description}</p>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Champion Advisor */}
                <p className="mt-20 text-center text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                    {t("champion_advisor_title")}
                </p>
                <p className="mt-6 text-center text-lg text-gray-400">{t("champion_advisor_desc")}</p>
                <p className="mt-2 text-center text-gray-400 text-base">{t("champion_advisor_note")}</p>
                <div className="mt-20 flex justify-center">
                    <motion.img
                        src="/homepictures/pickadvisor.PNG"
                        alt="Hans AI Coach Analyse"
                        className="object-cover rounded-lg w-full max-w-[800px]"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        whileHover={{ scale: 1.03, boxShadow: "0 0 30px rgba(99, 102, 241, 0.25)" }}
                    />
                </div>

                {/* Counterpicks */}
                <div className="mt-20 flex flex-col items-center">
                    <p className="mt-10 text-center text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                        {t("counterpicks_title")}
                    </p>
                    <p className="mt-6 text-center text-lg text-gray-400">{t("counterpicks_desc")}</p>
                    <a
                        href="/counter"
                        className="mt-10 px-4 py-4 rounded-md bg-indigo-600 text-white text-md font-bold shadow-xl
                        hover:bg-indigo-500 hover:scale-105 transition-all duration-300"
                    >
                        {t("counterpicks_button")}
                    </a>
                </div>
            </div>
        </section>
    );
}