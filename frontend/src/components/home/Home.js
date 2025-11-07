'use client'

import { useAuth } from "@/context/AuthContext";
import Navbar from "../navbar/Navbar";

export default function Home() {
    const { user } = useAuth();

    return (
        <div className="bg-gray-900 min-h-screen">
            <Navbar />
            <div className="relative isolate px-6 pt-14 lg:px-8">
                <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56 text-center">
                    <div className="hidden sm:mb-8 sm:flex sm:justify-center">
                        <div className="relative rounded-full px-3 py-1 text-sm text-gray-400 ring-1 ring-white/50">
                            BETA VERSION
                        </div>
                    </div>

                    <h1 className="text-5xl font-semibold tracking-tight text-white sm:text-7xl">
                        Steige an die Spitze auf
                    </h1>
                    <p className="mt-8 text-lg text-gray-400 sm:text-xl">
                        Mit unserem neuen KI-Tool war es noch nie so einfach, in League of Legends aufzusteigen und dein wahres Potenzial zu entfalten.
                    </p>

                    <div className="mt-10 flex justify-center gap-x-6">
                        <a
                            href="/download"
                            className="rounded-md bg-indigo-500 px-6 py-3 text-white font-semibold text-sm shadow hover:bg-indigo-400 transition"
                        >
                            Jetzt starten
                        </a>

                    </div>
                </div>
            </div>
        </div>
    )
}
