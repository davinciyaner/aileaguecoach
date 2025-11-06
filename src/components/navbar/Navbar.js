import React, {useState} from 'react';
import {Bars3Icon, XMarkIcon} from "@heroicons/react/24/outline";
import {Dialog, DialogPanel} from "@headlessui/react";
import {useAuth} from "@/context/AuthContext";
import {useRouter} from "next/navigation";


const navigation = [
    { name: 'Features', href: '#features' },
    { name: 'Zukunft', href: '#future' },
    { name: 'Bewertungen', href: '#reviews' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Download', href: '/download' },
]


const Navbar = ({ minimal = false }) => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [open, setOpen] = useState(false);
    const router = useRouter();
    const { user, logout } = useAuth();

    return (
        <header className="absolute inset-x-0 top-0 z-50">
            <nav aria-label="Global" className="flex items-center justify-between p-6 lg:px-8">
                <div className="flex lg:flex-1">
                    <a href="/" className="-m-1.5 p-1.5">
                        <h2 className="font-bold">Hans AI Coach</h2>
                    </a>
                </div>
                <div className="flex lg:hidden">
                    <button
                        type="button"
                        onClick={() => setMobileMenuOpen(true)}
                        className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-200"
                    >
                        <span className="sr-only">Open main menu</span>
                        <Bars3Icon aria-hidden="true" className="size-6" />
                    </button>
                </div>
                {!minimal && (
                    <>
                    <div className="hidden lg:flex lg:gap-x-12">
                        {navigation.map((item) => (
                            <a key={item.name} href={item.href} className="text-sm/6 font-semibold text-white">
                                {item.name}
                            </a>
                        ))}
                    </div>
                    </>
                    )}
                <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                    {!user ? (
                        <a href="/login" className="text-sm font-semibold text-white hover:text-indigo-400 transition">
                            Log in <span aria-hidden="true">&rarr;</span>
                        </a>
                    ) : (
                        <div className="relative">
                            <button
                                onClick={() => setOpen(!open)}
                                className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center hover:bg-indigo-500 transition"
                            >
                                {user.username ? user.username[0].toUpperCase() : "?"}
                            </button>
                            {open && (
                                <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-lg border border-gray-700">
                                    <button
                                        onClick={() => {
                                            router.push("/profil");
                                            setOpen(false);
                                        }}
                                        className="block w-full text-left px-4 py-2 hover:bg-gray-700 rounded-t-lg text-white"
                                    >
                                        Profile
                                    </button>
                                    <button
                                        onClick={() => {
                                            logout();
                                            setOpen(false);
                                            router.push("/");
                                        }}
                                        className="block w-full text-left px-4 py-2 hover:bg-gray-700 rounded-b-lg text-red-400"
                                    >
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </nav>
            <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
                <div className="fixed inset-0 z-50" />
                <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-gray-900 p-6 sm:max-w-sm sm:ring-1 sm:ring-gray-100/10">
                    <div className="flex items-center justify-between">
                        <a href="#" className="-m-1.5 p-1.5">
                            <span className="font-bold">AI League of Legends Coach</span>
                        </a>
                        <button
                            type="button"
                            onClick={() => setMobileMenuOpen(false)}
                            className="-m-2.5 rounded-md p-2.5 text-gray-200"
                        >
                            <span className="sr-only">Close menu</span>
                            <XMarkIcon aria-hidden="true" className="size-6" />
                        </button>
                    </div>
                    <div className="mt-6 flow-root">
                        <div className="-my-6 divide-y divide-white/10">
                            <div className="space-y-2 py-6">
                                {navigation.map((item) => (
                                    <a
                                        key={item.name}
                                        href={item.href}
                                        className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-white hover:bg-white/5"
                                    >
                                        {item.name}
                                    </a>
                                ))}
                            </div>
                            <div className="py-6">
                                <a
                                    href="/login"
                                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-white hover:bg-white/5"
                                >
                                    Log in
                                </a>
                            </div>
                        </div>
                    </div>
                </DialogPanel>
            </Dialog>
        </header>
    );
};

export default Navbar;