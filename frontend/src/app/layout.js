import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { LanguageProvider } from "@/context/LanguageContext";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import HtmlLangSetter from "@/components/HtmlLangSetter";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata = {
    metadataBase: new URL("https://aihanscoach.vercel.app"),
    title: "League of Legends AI – Dein smarter Ranked Coach",
    description: "Analysiere deine Spiele mit KI und erhalte Live-Empfehlungen.",
    icons: { icon: "/favicon.ico" }
};

export default function RootLayout({ children }) {
    return (
        <html>
        <LanguageProvider>
            <AuthProvider>
                <HtmlLangSetter />
                <body className={`${geistSans.variable} ${geistMono.variable}`}>
                {children}
                <SpeedInsights />
                <Analytics />
                </body>
            </AuthProvider>
        </LanguageProvider>
        </html>
    );
}