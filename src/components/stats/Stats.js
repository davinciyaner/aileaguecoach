"use client";

import React from "react";
import { motion } from "framer-motion";
import { Brain, Rocket, Users, Sparkles } from "lucide-react";

const timeline = [
    {
        icon: Brain,
        title: "Idea & Research",
        date: "October 11 2025",
        description:
            "Hans was born — the idea to create a next-generation AI coach that helps League of Legends players reach their full potential.",
    },
    {
        icon: Rocket,
        title: "MVP Development",
        date: "October 18 2025",
        description:
            "The first prototype is being built, featuring AI-driven real-time match analysis and coaching foundations.",
    },
    {
        icon: Users,
        title: "Closed Beta Launch",
        date: "October 26 2025",
        description:
            "Early access opens for selected players to test Hans and help shape the future of AI-powered training.",
    },
    {
        icon: Sparkles,
        title: "Public Release",
        date: "November 3 2025",
        description:
            "Hans goes live for everyone. Real-time coaching and performance dashboards become available to all players.",
    },
];

export default function Timeline() {
    return (
        <section className="relative bg-gray-950 py-24 sm:py-32 overflow-hidden">
            <div className="mx-auto max-w-5xl px-6 lg:px-8">
                <div id="future" className="text-center mb-16">
                    <h2 className="text-base font-semibold text-indigo-400">
                        Our Roadmap
                    </h2>
                    <p className="mt-2 text-4xl font-semibold text-white sm:text-5xl">
                        Building the Future of AI Coaching
                    </p>
                    <p className="mt-6 text-lg text-gray-400 max-w-2xl mx-auto">
                        From an ambitious idea to a revolutionary coaching platform —
                        here’s how Hans evolves step by step.
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
