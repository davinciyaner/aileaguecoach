import React from "react";
import Image from "next/image";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";

export const metadata = {
    title: "Über AI Hans Coach | Dein KI-League-of-Legends Coach",
    description:
        "Erfahre mehr über den AI Hans Coach – die KI, die dein League-of-Legends-Gameplay analysiert und dich gezielt besser macht.",
    openGraph: {
        title: "Über AI Hans Coach | Dein KI-League-of-Legends Coach",
        description:
            "Lerne das Team und die Vision hinter dem AI Hans Coach kennen. Wir bringen KI und Esports zusammen.",
        url: "https://aihanscoach.vercel.app/about",
        images: [
            {
                url: "https://aihanscoach.vercel.app/images/about-banner.jpg",
                width: 1200,
                height: 630,
                alt: "AI Hans Coach Team",
            },
        ],
        type: "website",
    },
};

export default function AboutPage() {
    return (
        <main className="bg-gray-950 text-gray-200 min-h-screen">
            <Navbar minimal={true}/>
            <section className="max-w-5xl mx-auto px-6 py-24">
                <h1 className="text-4xl font-bold text-white mb-8 text-center">
                    Über den AI Hans Coach
                </h1>

                <div className="flex flex-col md:flex-row items-center gap-10">
                    <div className="md:w-1/2">
                        <p className="text-lg leading-relaxed mb-6">
                            Der <strong>AI Hans Coach</strong> wurde entwickelt, um League-of-Legends-Spielern
                            mit Hilfe von <span className="text-indigo-400 font-semibold">Künstlicher Intelligenz </span>
                            messbar besser zu machen.
                        </p>

                        <p className="text-lg leading-relaxed mb-6">
                            <span className="font-semibold">Unsere Vision:</span> Eine Plattform, die deine Spielweise versteht,
                            Fehler erkennt und dich wie ein echter Coach begleitet.
                        </p>

                        <p className="text-lg leading-relaxed mb-6">
                            Mit modernster KI-Analyse, personalisiertem Feedback und tiefem Verständnis für
                            Esports-Strategien sorgt Hans dafür, dass du in jedem Match dein volles Potenzial abrufst.
                        </p>

                        <p className="text-lg leading-relaxed">
                            Hinter dem Projekt steht ein leidenschaftliches Team aus KI-Entwicklern,
                            Gamern und Visionären, das daran glaubt, dass die Zukunft des Coachings digital ist.
                        </p>
                    </div>

                    <div className="md:w-1/2">
                        <Image
                            src="/favicon.ico"
                            alt="AI Hans Coach Team"
                            width={600}
                            height={400}
                            className="rounded-2xl shadow-lg"
                        />
                    </div>
                </div>
            </section>
            <Footer />
        </main>
    );
}