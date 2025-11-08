import Home from "../components/home/Home";
import Features from "../components/features/Features";
import Stats from "../components/stats/Stats";
import Footer from "../components/footer/Footer";
import Faq from "../components/faq/Faq";
import Reviews from "../constants/reviews/Reviews";


export const metadata = {
    title: "League of Legends AI – Analysiere dein Spiel in Echtzeit",
    description:
        "Steige im Ranked mit KI-Unterstützung auf. Analysiere Objectives, Team Synergy und Meta-Champs in Echtzeit, um schneller aufzusteigen.",
    keywords: [
        "League of Legends AI",
        "LoL Analyse",
        "Ranked aufsteigen",
        "LoL KI Tool",
        "Meta Stats",
        "Champion Synergy",
    ],
    openGraph: {
        title: "League of Legends AI – Dein smarter Ranked Coach",
        description:
            "Erhalte Live-Assists und strategische Empfehlungen basierend auf Objectives, Meta und Team Synergy.",
        url: "https://aihanscoach.vercel.app/",
        siteName: "League of Legends AI",
        images: [
            {
                url: "/preview.png",
                width: 1200,
                height: 630,
                alt: "League of Legends AI Vorschau",
            },
        ],
        locale: "de_DE",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "League of Legends AI – Ranked Coach",
        description:
            "Analysiere deine Spiele mit KI und steige in League of Legends schneller auf.",
        images: ["/preview.png"],
    },
};


export default function Main() {
    return (
        <>
            <Home />
            <Features />
            <Stats />
            <Reviews />
            <Faq />
            <Footer />
        </>
    );
}