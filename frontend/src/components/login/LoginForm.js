"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

import { useLanguage } from "@/context/LanguageContext";
import deTranslations from '@/locales/de/common.json';
import enTranslations from '@/locales/en/common.json';

export default function LoginForm() {
    const router = useRouter();
    const { login } = useAuth();
    const { language } = useLanguage();
    const t = {
        de: {
            login_title: "Melde dich an",
            login_username_label: "Benutzername",
            login_username_placeholder: "Benutzername",
            login_password_label: "Passwort",
            login_password_placeholder: "Passwort",
            login_forgot_password: "Passwort vergessen?",
            login_submit: "Anmelden",
            login_loading: "Melde an...",
            login_no_account_text: "Noch keinen Account?",
            login_register_link: "Hier registrieren",
            login_error_default: "Deine Anmeldung ist fehlgeschlagen. Bitte versuche es erneut.",
        },
        en: {
            login_title: "Sign in",
            login_username_label: "Username",
            login_username_placeholder: "Username",
            login_password_label: "Password",
            login_password_placeholder: "Password",
            login_forgot_password: "Forgot Password?",
            login_submit: "Login",
            login_loading: "Login...",
            login_no_account_text: "Don't have an account?",
            login_register_link: "Register here",
            login_error_default: "Login failed. Please try again.",
        }
    }[language];

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const res = await fetch(`${API_URL}/api/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });

            const data = await res.json();

            if (!res.ok) throw new Error(data.message || t("login_error_default"));

            login(data.user, data.token);

            router.push("/");
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-white">
                    {t.login_title}
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-100">
                            {t.login_username_label}
                        </label>
                        <div className="mt-2">
                            <input
                                id="username"
                                type="text"
                                required
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder={t.login_username_placeholder}
                                className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:outline-indigo-500 sm:text-sm"
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-100">
                                {t.login_password_label}
                            </label>
                            <div className="text-sm">
                                <a href="/forgot-password" className="font-semibold text-indigo-400 hover:text-indigo-300">
                                    {t.login_forgot_password}
                                </a>
                            </div>
                        </div>
                        <div className="mt-2">
                            <input
                                id="password"
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder={t.login_password_placeholder}
                                className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:outline-indigo-500 sm:text-sm"
                            />
                        </div>
                    </div>

                    {error && <p className="text-sm text-red-400 text-center">{error}</p>}

                    <div>
                        <button
                            type="submit"
                            disabled={loading}
                            className={`flex w-full justify-center rounded-md ${
                                loading ? "bg-indigo-400" : "bg-indigo-500 hover:bg-indigo-400"
                            } px-3 py-1.5 text-sm font-semibold text-white focus-visible:outline-2 focus-visible:outline-indigo-500`}
                        >
                            {loading ? t.login_loading : t.login_submit}
                        </button>
                    </div>
                </form>

                <p className="mt-10 text-center text-sm text-gray-400">
                    {t.login_no_account_text}{" "}
                    <a href="/register" className="font-semibold text-indigo-400 hover:text-indigo-300">
                        {t.login_register_link}
                    </a>
                </p>
            </div>
        </div>
    );
}