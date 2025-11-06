'use client'

import { useState } from 'react'
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Navbar from "@/components/navbar/Navbar";

export default function Home() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const { user, logout } = useAuth();
    const [open, setOpen] = useState(false);
    const router = useRouter();

    return (
        <div className="bg-gray-900">
            <Navbar />
            <div className="relative isolate px-6 pt-14 lg:px-8">
                <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
                    <div className="hidden sm:mb-8 sm:flex sm:justify-center">
                        <div className="relative rounded-full px-3 py-1 text-sm/6 text-gray-400 ring-1 ring-white/50">
                            BETA VERSION{' '}
                            <a className="font-bold text-indigo-400">
                                <span aria-hidden="true" className="absolute inset-0" />
                            </a>
                        </div>
                    </div>

                    <div className="text-center">
                        <h1 className="text-5xl font-semibold tracking-tight text-balance text-white sm:text-7xl">
                            Steige an die Spitze auf
                        </h1>
                        <p className="mt-8 text-lg font-medium text-pretty text-gray-400 sm:text-xl/8">
                            Mit unserem neuen KI-Tool war es noch nie so einfach, in League of Legends aufzusteigen und dein wahres Potenzial zu entfalten.
                        </p>
                        <div className="mt-10 flex items-center justify-center gap-x-6">
                            <a
                                href="/download"
                                className="rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                            >
                                Jetzt starten
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}