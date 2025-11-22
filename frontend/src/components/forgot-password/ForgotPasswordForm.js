'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

import { useLanguage } from '@/context/LanguageContext'
import deTranslations from '@/locales/de/common.json';
import enTranslations from '@/locales/en/common.json';

export default function ForgotPasswordForm() {
    const router = useRouter()
    const { language } = useLanguage()
    const t = (key) => (language === 'de' ? deTranslations[key] : enTranslations[key])

    const [email, setEmail] = useState('')
    const [error, setError] = useState('')
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)

    const API_URL = process.env.NEXT_PUBLIC_API_URL

    const validateEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setMessage('')

        if (!email) {
            setError(t('forgot_email_required'))
            return
        }
        if (!validateEmail(email)) {
            setError(t('forgot_email_invalid'))
            return
        }

        setLoading(true)
        try {
            const res = await fetch(`${API_URL}/auth/forgot-password`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            })

            const data = await res.json()
            if (!res.ok) throw new Error(data.message || t('forgot_error'))

            setMessage(t('forgot_success'))

            setTimeout(() => {
                router.push('/login')
            }, 5000)
        } catch (err) {
            setError(err.message || t('forgot_error'))
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 px-6 py-12">
            <div className="w-full max-w-md bg-gray-800 p-8 rounded-lg shadow">
                <h2 className="text-2xl font-semibold text-white mb-4">{t('forgot_title')}</h2>
                <p className="text-sm text-gray-300 mb-6">{t('forgot_description')}</p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <label className="block">
                        <span className="text-sm text-gray-200">{t('forgot_email_label')}</span>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder={t('forgot_email_placeholder')}
                            className="mt-1 block w-full rounded-md bg-white/5 px-3 py-2 text-white placeholder:text-gray-500 focus:outline-2 focus:outline-indigo-500"
                            required
                        />
                    </label>

                    {error && <p className="text-sm text-red-400">{error}</p>}
                    {message && <p className="text-sm text-green-400">{message}</p>}

                    <div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-indigo-500 hover:bg-indigo-400 text-white py-2 rounded-md font-semibold disabled:opacity-60"
                        >
                            {loading ? t('forgot_sending') : t('forgot_send')}
                        </button>
                    </div>
                </form>

                <div className="mt-6 text-center">
                    <button
                        onClick={() => router.push('/login')}
                        className="text-sm text-indigo-300 hover:text-indigo-200 underline"
                    >
                        {t('forgot_back_login')}
                    </button>
                </div>
            </div>
        </div>
    )
}