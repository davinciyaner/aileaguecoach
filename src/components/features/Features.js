"use client";
import React from "react";
import { motion } from "framer-motion";
import { Brain, TrendingUp, Target, Zap } from "lucide-react";

const features = [
    {
        name: "AI Match Analysis",
        description:
            "Our AI reviews your games in detail — from gold lead and objectives to decision-making. Understand exactly what separates you from the next rank.",
        icon: Brain,
    },
    {
        name: "Progress Tracking",
        description:
            "Track your growth over time with visual stats like. (Coming Soon)",
        icon: TrendingUp,
    },
    {
        name: "Personalized Training Plans",
        description:
            "Get custom daily drills and improvement tasks based on your weaknesses, role, and champion pool. (Coming Soon)",
        icon: Target,
    },
    {
        name: "Live In-Game Coaching",
        description:
            "Receive real-time tips while playing — your personal Challenger-level coach by your side.",
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
        <section className="relative bg-gray-950 py-24 sm:py-32 overflow-hidden">
            {/* subtle gradient glow in the background */}
            <div id="features" className="absolute inset-0 bg-gradient-to-b from-indigo-500/10 via-transparent to-gray-950 pointer-events-none" />

            <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="mx-auto max-w-2xl text-center"
                >
                    <h2 className="text-base font-semibold text-indigo-400">
                        Smarter. Faster. Stronger.
                    </h2>
                    <p className="mt-2 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                        The Future of League of Legends Coaching
                    </p>
                    <p className="mt-6 text-lg text-gray-400">
                        Hans is your personal AI coach — analyzing your games, creating
                        tailored training plans, and teaching you how to think like a pro.
                    </p>
                </motion.div>

                {/* Feature Grid */}
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
                                boxShadow: "0 0 20px rgba(99, 102, 241, 0.3)",
                            }}
                            className="relative rounded-2xl bg-gray-800/40 p-8 shadow-lg ring-1 ring-white/10 transition-all"
                        >
                            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-500/20 text-indigo-400 mb-6">
                                <feature.icon className="h-6 w-6" />
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-2">
                                {feature.name}
                            </h3>
                            <p className="text-gray-400 text-base">{feature.description}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
