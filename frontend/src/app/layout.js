import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import {AuthProvider} from "@/context/AuthContext";
import { SpeedInsights } from "@vercel/speed-insights/next"


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
    metadataBase: new URL("https://aihanscoach.vercel.app"),
    title: "League of Legends AI – Dein smarter Ranked Coach",
    description: "Analysiere deine Spiele mit KI und erhalte Live-Empfehlungen.",
    icons: {
        icon: "/favicon.ico",
    }
};


export default function RootLayout({ children }) {
  return (
      <html lang="de">
      <body>
      <AuthProvider>{children}</AuthProvider>
      <SpeedInsights />
      </body>
      </html>
  );
}