"use client";
import React from "react";
import { motion } from "framer-motion";
import { Brain, TrendingUp, Target, Zap } from "lucide-react";

const features = [
    {
        name: "KI-Spielanalyse",
        description:
            "Unsere KI analysiert deine Spiele im Detail – von Goldvorsprung und Objectives bis hin zu Entscheidungsfindung. Erfahre genau, was dich vom nächsten Rang trennt.",
        icon: Brain,
    },
    {
        name: "Fortschrittsverfolgung",
        description:
            "Verfolge dein Wachstum im Laufe der Zeit mit visuellen Statistiken. (Demnächst verfügbar)",
        icon: TrendingUp,
    },
    {
        name: "Personalisierte Trainingspläne",
        description:
            "Erhalte tägliche, auf dich zugeschnittene Übungsaufgaben basierend auf deinen Schwächen, deiner Rolle und deinem Champion-Pool. (Demnächst verfügbar)",
        icon: Target,
    },
    {
        name: "Live Coaching im Spiel",
        description:
            "Erhalte in Echtzeit Tipps während des Spiels – dein persönlicher Coach auf Challenger-Niveau an deiner Seite.",
        icon: Zap,
    },
];

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
        },
    },
};

const item = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function Features() {
    return (
        <section className="relative bg-[#0a0a0f] py-24 sm:py-32 overflow-hidden">
            {/* sanfter Verlauf */}
            <div
                id="features"
                className="absolute inset-0 bg-gradient-to-b from-indigo-500/10 via-transparent to-[#0a0a0f] pointer-events-none"
            />

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
                        Schlauer. Schneller. Stärker.
                    </h2>
                    <p className="mt-2 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                        Die Zukunft des League of Legends Coachings
                    </p>
                    <p className="mt-6 text-lg text-gray-400">
                        Hans ist dein persönlicher KI-Coach – analysiert deine Spiele, erstellt individuelle Trainingspläne und zeigt dir, wie du wie ein Profi denkst.
                    </p>
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
                            whileHover={{
                                scale: 1.03,
                                boxShadow: "0 0 20px rgba(99, 102, 241, 0.25)",
                            }}
                            className="relative rounded-2xl bg-[rgba(31,41,55,0.4)] backdrop-blur-sm p-8 shadow-lg border border-white/10 transition-all"
                        >
                            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-500/20 text-indigo-400 mb-6">
                                <feature.icon className="h-6 w-6" />
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-2">
                                {feature.name}
                            </h3>
                            <p className="text-gray-400 text-base">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}