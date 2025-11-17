"use client";

import React, { useState } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";

import { useLanguage } from "@/context/LanguageContext";
import deTranslations from '@/locales/de/common.json';
import enTranslations from '@/locales/en/common.json';


export default function Faq() {
    const { language } = useLanguage();
    const t = (key) => (language === "de" ? deTranslations[key] : enTranslations[key]);

    const faqs = Array.from({ length: 8 }, (_, i) => ({
        question: t(`faq_${i + 1}_question`),
        answer: t(`faq_${i + 1}_answer`),
    }));

    const [openIndex, setOpenIndex] = useState(null);

    const toggleIndex = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="bg-gray-900 py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl text-center">
                    <h2 id="faq" className="text-base font-semibold text-indigo-400">{t("faq_title")}</h2>
                    <p className="mt-2 text-4xl font-semibold text-white sm:text-5xl">{t("faq_heading")}</p>
                    <p className="mt-6 text-lg text-gray-400">{t("faq_description")}</p>
                </div>

                <div className="mt-16 max-w-2xl mx-auto space-y-4">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className="bg-gray-800 rounded-xl p-6 cursor-pointer transition hover:bg-gray-750"
                            onClick={() => toggleIndex(index)}
                        >
                            <div className="flex items-center justify-between">
                                <h3 className="text-white text-lg font-medium">{faq.question}</h3>
                                {openIndex === index ? (
                                    <ChevronUpIcon className="h-5 w-5 text-indigo-400" />
                                ) : (
                                    <ChevronDownIcon className="h-5 w-5 text-indigo-400" />
                                )}
                            </div>
                            {openIndex === index && (
                                <p className="mt-4 text-gray-300">{faq.answer}</p>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}