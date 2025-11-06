"use client";

import React from "react";
import { motion } from "framer-motion";
import { Brain, Rocket, Users, Sparkles } from "lucide-react";

const timeline = [
    {
        icon: Brain,
        title: "Idee & Forschung",
        date: "11. Oktober 2025",
        description:
            "Die Idee zu Hans war geboren – ein KI-Coach der nächsten Generation, der League of Legends-Spielern hilft, ihr volles Potenzial zu entfalten.",
    },
    {
        icon: Rocket,
        title: "MVP-Entwicklung",
        date: "18. Oktober 2025",
        description:
            "Der erste Prototyp wird entwickelt – mit KI-gestützter Echtzeitanalyse und den Grundlagen für intelligentes Coaching.",
    },
    {
        icon: Users,
        title: "Geschlossene Beta",
        date: "26. Oktober 2025",
        description:
            "Der frühe Zugang startet für ausgewählte Spieler, um Hans zu testen und die Zukunft des KI-basierten Trainings mitzugestalten.",
    },
    {
        icon: Sparkles,
        title: "Öffentliche Veröffentlichung",
        date: "3. November 2025",
        description:
            "Hans geht offiziell live. Echtzeit-Coaching und Performance-Dashboards werden für alle Spieler verfügbar.",
    },
];

export default function Timeline() {
    return (
        <section className="relative bg-gray-950 py-24 sm:py-32 overflow-hidden">
            <div className="mx-auto max-w-5xl px-6 lg:px-8">
                <div id="future" className="text-center mb-16">
                    <h2 className="text-base font-semibold text-indigo-400">
                        Unsere Roadmap
                    </h2>
                    <p className="mt-2 text-4xl font-semibold text-white sm:text-5xl">
                        Wir bauen die Zukunft des KI-Coachings
                    </p>
                    <p className="mt-6 text-lg text-gray-400 max-w-2xl mx-auto">
                        Von einer ehrgeizigen Idee zu einer revolutionären Coaching-Plattform –
                        so entwickelt sich Hans Schritt für Schritt weiter.
                    </p>
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
                                <h3 className="text-xl font-semibold text-white">
                                    {step.title}
                                </h3>
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