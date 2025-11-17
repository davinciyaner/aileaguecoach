'use client'

import React from "react";
import { motion } from "framer-motion";
import { Brain, Rocket, Users, Sparkles } from "lucide-react";

import { useLanguage } from "@/context/LanguageContext";
import deTranslations from '@/locales/de/common.json';
import enTranslations from '@/locales/en/common.json';

export default function Timeline() {
    const { language } = useLanguage();
    const t = (key) => (language === "de" ? deTranslations[key] : enTranslations[key]);

    const timeline = [
        { icon: Brain, title: t("timeline_step_1_title"), date: t("timeline_step_1_date"), description: t("timeline_step_1_desc") },
        { icon: Rocket, title: t("timeline_step_2_title"), date: t("timeline_step_2_date"), description: t("timeline_step_2_desc") },
        { icon: Users, title: t("timeline_step_3_title"), date: t("timeline_step_3_date"), description: t("timeline_step_3_desc") },
        { icon: Sparkles, title: t("timeline_step_4_title"), date: t("timeline_step_4_date"), description: t("timeline_step_4_desc") },
    ];

    return (
        <section className="relative bg-gray-950 py-24 sm:py-32 overflow-hidden">
            <div className="mx-auto max-w-5xl px-6 lg:px-8">
                <div id="future" className="text-center mb-16">
                    <h2 className="text-base font-semibold text-indigo-400">{t("timeline_title_small")}</h2>
                    <p className="mt-2 text-4xl font-semibold text-white sm:text-5xl">{t("timeline_title_big")}</p>
                    <p className="mt-6 text-lg text-gray-400 max-w-2xl mx-auto">{t("timeline_description")}</p>
                </div>

                <div className="relative border-l border-gray-700 pl-16 space-y-12">
                    {timeline.map((step, i) => (
                        <motion.div
                            key={step.title}
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: i * 0.2 }}
                            className="relative"
                        >
                            <div className="absolute -left-14 top-0 flex h-12 w-12 items-center justify-center rounded-full bg-indigo-500/20 text-indigo-400 ring-2 ring-indigo-500/40">
                                <step.icon className="h-6 w-6" />
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold text-white">{step.title}</h3>
                                <p className="text-sm text-indigo-400 mt-1">{step.date}</p>
                                <p className="mt-3 text-gray-400">{step.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}