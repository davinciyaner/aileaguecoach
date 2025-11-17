'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

import { useLanguage } from '@/context/LanguageContext'
import deTranslations from '@/locales/de/common.json';
import enTranslations from '@/locales/en/common.json';

export default function RegisterForm() {
    const router = useRouter()
    const { language } = useLanguage()
    const t = (key) => (language === 'de' ? deTranslations[key] : enTranslations[key])

    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const API_URL = process.env.NEXT_PUBLIC_API_URL

    const handleRegister = async (e) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        try {
            const res = await fetch(`${API_URL}/api/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, username, password }),
            })

            const data = await res.json()
            if (!res.ok) throw new Error(data.message || t('register_error'))

            localStorage.setItem('token', data.token)
            router.push('/login')
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-white">
                    {t('register_title')}
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form onSubmit={handleRegister} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-100">
                            {t('register_email_label')}
                        </label>
                        <div className="mt-2">
                            <input
                                id="email"
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder={t('register_email_placeholder')}
                                className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:outline-indigo-500 sm:text-sm"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-100">
                            {t('register_username_label')}
                        </label>
                        <div className="mt-2">
                            <input
                                id="username"
                                type="text"
                                required
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder={t('register_username_placeholder')}
                                className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:outline-indigo-500 sm:text-sm"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-100">
                            {t('register_password_label')}
                        </label>
                        <div className="mt-2">
                            <input
                                id="password"
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder={t('register_password_placeholder')}
                                className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:outline-indigo-500 sm:text-sm"
                            />
                        </div>
                    </div>

                    {error && <p className="text-sm text-red-400 text-center">{error}</p>}

                    <div>
                        <button
                            type="submit"
                            disabled={loading}
                            className={`flex w-full justify-center rounded-md ${
                                loading ? 'bg-indigo-400' : 'bg-indigo-500 hover:bg-indigo-400'
                            } px-3 py-1.5 text-sm font-semibold text-white focus-visible:outline-2 focus-visible:outline-indigo-500`}
                        >
                            {loading ? t('register_loading') : t('register_submit')}
                        </button>
                    </div>
                </form>

                <p className="mt-10 text-center text-sm text-gray-400">
                    {t('register_already_account')}{' '}
                    <a href="/login" className="font-semibold text-indigo-400 hover:text-indigo-300">
                        {t('register_login')}
                    </a>
                </p>
            </div>
        </div>
    )
}