"use client";
import React from "react";
import Navbar from "../../components/navbar/Navbar";

import {useLanguage} from "@/context/LanguageContext";
import deTranslations from "@/locales/de/common.json";
import enTranslations from "@/locales/en/common.json";
import Footer from "@/components/footer/Footer";

const PrivacyPolicy = () => {
    const { language } = useLanguage();
    const t = (key) => {
        const translations = language === 'de' ? deTranslations : enTranslations;
        return translations[key] || key; // fallback falls Key fehlt
    };

    return (
        <div className="min-h-screen bg-gray-900">
                <Navbar minimal={true} />

            <main className="max-w-4xl mx-auto px-6 py-16">
                <h1 className="text-4xl font-bold text-white mb-4">{t('privacyTitle')}</h1>
                <p className="text-gray-400 mb-8">{t('privacyIntro')}</p>

                <section className="space-y-6 text-gray-300">
                    <div>
                        <h2 className="text-2xl font-semibold text-indigo-400 mb-2">{t('controllerTitle')}</h2>
                        <p className="leading-relaxed whitespace-pre-line">{t('controllerText')}</p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold text-indigo-400 mb-2">{t('dataProcessedTitle')}</h2>
                        <p className="leading-relaxed">{t('dataProcessedText')}</p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold text-indigo-400 mb-2">{t('purposeTitle')}</h2>
                        <p className="leading-relaxed">{t('purposeText')}</p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold text-indigo-400 mb-2">{t('paypalTitle')}</h2>
                        <p className="leading-relaxed text-gray-400 mb-2">
                            {t('paypalText1')}
                            <a
                                href="https://www.paypal.com/de/webapps/mpp/ua/privacy-full"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-indigo-300 underline"
                            >
                                PayPal Datenschutz
                            </a>
                        </p>
                        <p className="text-gray-400">{t('paypalText2')}</p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold text-indigo-400 mb-2">{t('hostingTitle')}</h2>
                        <p className="leading-relaxed">{t('hostingText')}</p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold text-indigo-400 mb-2">{t('cookiesTitle')}</h2>
                        <p className="leading-relaxed text-gray-400 mb-4">{t('cookiesText')}</p>
                        <div className="bg-gray-800 p-4 rounded-md border border-gray-700">
                            <h3 className="text-lg font-semibold text-white mb-2">{t('cookieSummaryTitle')}</h3>
                            <ul className="list-disc list-inside text-gray-300">
                                {t('cookieSummaryList', { returnObjects: true }).map((item, index) => (
                                    <li key={index}>{item}</li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold text-indigo-400 mb-2">{t('thirdPartyTitle')}</h2>
                        <p className="leading-relaxed">{t('thirdPartyText')}</p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold text-indigo-400 mb-2">{t('storageTitle')}</h2>
                        <p className="leading-relaxed">{t('storageText')}</p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold text-indigo-400 mb-2">{t('rightsTitle')}</h2>
                        <p className="leading-relaxed">{t('rightsText')}</p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold text-indigo-400 mb-2">{t('securityTitle')}</h2>
                        <p className="leading-relaxed">{t('securityText')}</p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold text-indigo-400 mb-2">{t('changesTitle')}</h2>
                        <p className="leading-relaxed text-gray-400">{t('changesText')}</p>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default PrivacyPolicy;