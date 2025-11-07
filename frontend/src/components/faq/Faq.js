"use client";
import React, { useState } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";

const faqs = [
    {
        question: "Was ist Hans AI Coach?",
        answer:
            "Hans ist dein persönlicher, KI-gestützter League-of-Legends-Coach. Er analysiert deine Spiele in Echtzeit, verfolgt deine Performance und gibt dir personalisierte Tipps, damit du schneller im Rang aufsteigen kannst.",
    },
    {
        question: "Wie funktioniert die KI-Beratung?",
        answer:
            "Die KI analysiert deine Spieldaten – darunter Kills, Tode, Assists, Bewegungen auf der Karte und Item-Builds – und erstellt daraus individuelle Verbesserungsvorschläge basierend auf Profi-Strategien und Best Practices.",
    },
    {
        question: "Brauche ich ein Abonnement?",
        answer:
            "Nein, aktuell brauchst du kein Abonnement. Hans AI Coach befindet sich in der Beta-Phase und ist derzeit komplett kostenlos nutzbar. Später wird es verschiedene Preisstufen geben – abhängig davon, wie viele Spiele du tracken und wie tief die Coaching-Analyse gehen soll.",
    },
    {
        question: "Kann ich mein Konto oder zukünftige Abos jederzeit kündigen?",
        answer:
            "Ja, selbstverständlich! Sobald die Bezahlversion aktiviert wird, kannst du dein Konto oder dein Abonnement jederzeit direkt über dein Dashboard verwalten und kündigen.",
    },
    {
        question: "Sind meine Daten sicher?",
        answer:
            "Ja! Alle deine Spieldaten und persönlichen Informationen werden verschlüsselt übertragen und sicher gespeichert – nach modernen Datenschutzstandards. Deine Daten gehören ausschließlich dir.",
    },
    {
        question: "Warum ist es eine .exe-Datei?",
        answer:
            "Windows Defender zeigt möglicherweise eine Warnung, weil die Anwendung aktuell keine offizielle Code-Zertifizierung besitzt. Diese kostet 350–500 €. Da ich eine Ausbidlung mache und Hans AI Coach als Solo-Projekt entwickle, kann ich mir das momentan noch nicht leisten. Die Software ist jedoch sicher.",
    },
    {
        question: "Ist das Programm wirklich kostenlos?",
        answer:
            "Ja! In der aktuellen Beta-Version ist Hans AI Coach komplett kostenlos. Du kannst alle Kernfunktionen frei testen und mir Feedback geben, um die Entwicklung zu verbessern. In Zukunft wird es ein faires Preismodell mit verschiedenen Stufen geben.",
    },
];

export default function Faq() {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleIndex = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="bg-gray-900 py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl text-center">
                    <h2 id="faq" className="text-base font-semibold text-indigo-400">FAQ</h2>
                    <p className="mt-2 text-4xl font-semibold text-white sm:text-5xl">
                        Häufig gestellte Fragen
                    </p>
                    <p className="mt-6 text-lg text-gray-400">
                        Hier findest du Antworten auf die häufigsten Fragen rund um Hans AI Coach.
                    </p>
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
