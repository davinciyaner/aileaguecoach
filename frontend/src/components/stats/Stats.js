'use client'

import React from "react";

import { useLanguage } from "@/context/LanguageContext";
import deTranslations from '@/locales/de/common.json';
import enTranslations from '@/locales/en/common.json';

export default function Timeline() {
    const { language } = useLanguage();
    const t = (key) => (language === "de" ? deTranslations[key] : enTranslations[key]);

    const stats = [
        { id: 1, title: 'timeline_step_1_desc', description: 'timeline_step_1_title' },
        { id: 2, title: 'timeline_step_2_desc', description: 'timeline_step_2_title' },
        { id: 3, title: 'timeline_step_3_desc', description: 'timeline_step_3_title' },
    ]

    return (
        <div id="reviews" className="bg-gray-900 py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3">
                    {stats.map((stat) => (
                        <div key={stat.id} className="mx-auto flex max-w-xs flex-col gap-y-4">
                            <dt className="text-base/7 text-gray-400">{t(stat.title)}</dt>
                            <dd className="order-first text-3xl font-semibold tracking-tight text-white sm:text-5xl">{t(stat.description)}</dd>
                        </div>
                    ))}
                </dl>
            </div>
        </div>
    );
}