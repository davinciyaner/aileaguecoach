'use client'

import React from "react";
import Image from "next/image";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import { useLanguage } from "@/context/LanguageContext";

const content = {
    de: {
        title: "Über den AI Hans Coach",
        intro: "Der AI Hans Coach wurde entwickelt, um League-of-Legends-Spielern mit Hilfe von Künstlicher Intelligenz messbar besser zu machen.",
        vision: "Unsere Vision: Eine Plattform, die deine Spielweise versteht, Fehler erkennt und dich wie ein echter Coach begleitet.",
        features: "Mit modernster KI-Analyse, personalisiertem Feedback und tiefem Verständnis für Esports-Strategien sorgt Hans dafür, dass du in jedem Match dein volles Potenzial abrufst.",
        team: "Hinter dem Projekt steht ein leidenschaftliches Team aus KI-Entwicklern, Gamern und Visionären, das daran glaubt, dass die Zukunft des Coachings digital ist."
    },
    en: {
        title: "About AI Hans Coach",
        intro: "AI Hans Coach was developed to help League-of-Legends players improve measurably using Artificial Intelligence.",
        vision: "Our vision: A platform that understands your gameplay, detects mistakes, and guides you like a real coach.",
        features: "With state-of-the-art AI analysis, personalized feedback, and deep esports strategy understanding, Hans ensures you reach your full potential in every match.",
        team: "Behind the project is a passionate team of AI developers, gamers, and visionaries who believe the future of coaching is digital."
    }
};

export default function AboutPage() {
    const { language } = useLanguage();
    const langContent = content[language] || content.de;

    return (
        <main className="bg-gray-950 text-gray-200 min-h-screen">
            <Navbar minimal={true} />

            <section className="max-w-5xl mx-auto px-6 py-24">
                <h1 className="text-4xl font-bold text-white mb-12 text-center">
                    {langContent.title}
                </h1>

                <div className="flex flex-col md:flex-row items-center gap-12">
                    <div className="md:w-1/2 space-y-6">
                        <p className="text-lg leading-relaxed">{langContent.intro}</p>
                        <p className="text-lg leading-relaxed">{langContent.vision}</p>
                        <p className="text-lg leading-relaxed">{langContent.features}</p>
                        <p className="text-lg leading-relaxed">{langContent.team}</p>
                    </div>

                    <div className="md:w-1/2">
                        <Image
                            src="/favicon.ico"
                            alt="AI Hans Coach Team"
                            width={600}
                            height={400}
                            className="rounded-2xl shadow-lg object-cover"
                        />
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}