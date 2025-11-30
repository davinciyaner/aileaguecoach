'use client'

import React, { useState } from 'react'
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Dialog, DialogPanel } from "@headlessui/react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

import { useLanguage } from "@/context/LanguageContext";
import deTranslations from '@/locales/de/common.json';
import enTranslations from '@/locales/en/common.json';

const Navbar = ({ minimal = false }) => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [open, setOpen] = useState(false);
    const router = useRouter();
    const { user, logout } = useAuth();
    const { language, setLanguage } = useLanguage();
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const t = (key) => (language === 'de' ? deTranslations[key] : enTranslations[key]);

    const toggleLanguageDropdown = () => setDropdownOpen(!dropdownOpen);

    const changeLanguage = (lng) => {
        setLanguage(lng);
        setDropdownOpen(false);
    }

    const navigation = [
        { name: t("navbar_about"), href: '/about' },
        { name: t("navbar_reviews"), href: '#reviews' },
        { name: t("navbar_future"), href: '#future' },
        { name: t("navbar_features"), href: '#features' },
        { name: t("navbar_faq"), href: '#faq' },
        { name: t("navbar_download"), href: '/download' },
        { name: t("navbar_discord"), href: 'https://discord.gg/4ecd9TvCmU' },
    ];

    return (
        <header className="absolute inset-x-0 top-0 z-50">
            <nav className="flex items-center justify-between p-6 lg:px-8">
                <div className="flex lg:flex-1">
                    <a href="/" className="-m-1.5 p-1.5">
                        <h2 className="text-white font-bold text-xl">{t("navbar_brand")}</h2>
                    </a>
                </div>

                {!minimal && (
                    <div className="hidden lg:flex lg:gap-x-12">
                        {navigation.map(item => (
                            <a
                                key={item.name}
                                href={item.href}
                                className="text-white font-semibold text-sm hover:text-indigo-400 transition"
                            >
                                {item.name}
                            </a>
                        ))}
                    </div>
                )}

                <div className="hidden lg:flex lg:flex-1 lg:justify-end items-center gap-4">
                    <div className="relative">
                        <button
                            onClick={toggleLanguageDropdown}
                            className="bg-gray-800 px-3 py-1 rounded hover:bg-gray-700 transition"
                        >
                            {language === 'de' ? '🇩🇪 Deutsch' : '🇬🇧 English'}
                        </button>
                        {dropdownOpen && (
                            <div className="absolute right-0 mt-2 w-40 bg-gray-800 rounded shadow-lg z-10">
                                <button
                                    className="w-full text-left px-4 py-2 hover:bg-gray-700 transition"
                                    onClick={() => changeLanguage('de')}
                                >
                                    🇩🇪 Deutsch
                                </button>
                                <button
                                    className="w-full text-left px-4 py-2 hover:bg-gray-700 transition"
                                    onClick={() => changeLanguage('en')}
                                >
                                    🇬🇧 English
                                </button>
                            </div>
                        )}
                    </div>

                    {!user ? (
                        <a href="/login" className="text-white font-semibold text-sm hover:text-indigo-400 transition">
                            {t("navbar_login")} <span aria-hidden="true">&rarr;</span>
                        </a>
                    ) : (
                        <div className="relative">
                            <button
                                onClick={() => setOpen(!open)}
                                className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold hover:bg-indigo-500 transition"
                            >
                                {user.username ? user.username[0].toUpperCase() : "?"}
                            </button>
                            {open && (
                                <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow border border-gray-700">
                                    <button
                                        onClick={() => { router.push("/profil"); setOpen(false) }}
                                        className="block w-full text-left px-4 py-2 text-white hover:bg-gray-700 rounded-t-lg"
                                    >
                                        {t("navbar_profile")}
                                    </button>
                                    <button
                                        onClick={() => { logout(); setOpen(false); router.push("/") }}
                                        className="block w-full text-left px-4 py-2 text-red-400 hover:bg-gray-700 rounded-b-lg"
                                    >
                                        {t("navbar_logout")}
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                <div className="flex lg:hidden">
                    <button
                        onClick={() => setMobileMenuOpen(true)}
                        className="-m-2.5 p-2.5 rounded-md text-white hover:bg-gray-800 transition"
                    >
                        <span className="sr-only">{t("navbar_open_menu")}</span>
                        <Bars3Icon className="h-6 w-6" aria-hidden="true"/>
                    </button>
                </div>
            </nav>

            <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
                <div className="fixed inset-0 z-50" />
                <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full max-w-sm overflow-y-auto bg-gray-900 p-6 shadow-lg border border-gray-700">
                    <div className="flex items-center justify-between">
                        <a href="/" className="-m-1.5 p-1.5">
                            <h2 className="text-white font-bold text-xl">{t("navbar_brand")}</h2>
                        </a>
                        <button
                            onClick={() => setMobileMenuOpen(false)}
                            className="-m-2.5 p-2.5 rounded-md text-white hover:bg-gray-800 transition"
                        >
                            <span className="sr-only">{t("navbar_close_menu")}</span>
                            <XMarkIcon className="h-6 w-6"/>
                        </button>
                    </div>
                    <div className="mt-6 flow-root">
                        <div className="-my-6 divide-y divide-gray-700">
                            <div className="space-y-2 py-6">
                                {navigation.map(item => (
                                    <a
                                        key={item.name}
                                        href={item.href}
                                        className="-mx-3 block rounded-lg px-3 py-2 text-white font-semibold text-base hover:bg-gray-800 transition"
                                    >
                                        {item.name}
                                    </a>
                                ))}
                            </div>
                            <div className="py-6 flex flex-col gap-2">
                                <button
                                    className="text-left px-3 py-2 rounded hover:bg-gray-800 transition"
                                    onClick={() => changeLanguage('de')}
                                >
                                    🇩🇪 Deutsch
                                </button>
                                <button
                                    className="text-left px-3 py-2 rounded hover:bg-gray-800 transition"
                                    onClick={() => changeLanguage('en')}
                                >
                                    🇬🇧 English
                                </button>

                                {!user && (
                                    <a
                                        href="/login"
                                        className="-mx-3 block rounded-lg px-3 py-2 text-white font-semibold hover:bg-gray-800 transition"
                                    >
                                        {t("navbar_login")}
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                </DialogPanel>
            </Dialog>
        </header>
    )
}

export default Navbar;