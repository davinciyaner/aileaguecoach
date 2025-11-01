"use client";
import React, { useState } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";

const faqs = [
    {
        question: "What is Hans AI Coach?",
        answer:
            "Hans is your personal AI-powered League of Legends coach. It provides live game analysis, tracks your performance, and gives personalized advice to help you climb the ladder faster.",
    },
    {
        question: "How does the AI give advice?",
        answer:
            "The AI analyzes your gameplay data including kills, deaths, assists, map movements, and item choices. It then generates actionable insights and tips based on best practices and professional strategies.",
    },
    {
        question: "Do I need a subscription?",
        answer:
            "Yes, Hans AI Coach has multiple pricing tiers depending on how many games you want to track and the level of coaching support you need.",
    },
    {
        question: "Can I cancel my subscription anytime?",
        answer:
            "Absolutely! You can manage and cancel your subscription directly from your account dashboard at any time.",
    },
    {
        question: "Is my data safe?",
        answer:
            "Yes! All your game data and personal information are encrypted and handled securely according to modern data privacy standards.",
    },
    {
        question: "Why is it an .exe?",
        answer:
            "You get a notification from your Windows Defender because I honestly don't have 350-500 € for the certification. I'm a student and solo developed this AI coach.",
    },
];

export default function Faq() {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleIndex = (index) => {
        if (openIndex === index) {
            setOpenIndex(null);
        } else {
            setOpenIndex(index);
        }
    };

    return (
        <section className="bg-gray-900 py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl text-center">
                    <h2 id="faq" className="text-base font-semibold text-indigo-400">FAQ</h2>
                    <p className="mt-2 text-4xl font-semibold text-white sm:text-5xl">
                        Frequently Asked Questions
                    </p>
                    <p className="mt-6 text-lg text-gray-400">
                        Here are some of the most common questions we get from new users.
                    </p>
                </div>

                <div className="mt-16 max-w-2xl mx-auto space-y-4">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className="bg-gray-800 rounded-xl p-6 cursor-pointer"
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