'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function ForgotPasswordForm() {
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [error, setError] = useState('')
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)

    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    const validateEmail = (value) => {
        // einfache Email-Validation
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setMessage('')

        if (!email) {
            setError('Bitte geben deine E-Mail Adresse ein')
            return
        }
        if (!validateEmail(email)) {
            setError('Bitte gebe eine richtige E-Mail Adresse ein')
            return
        }

        setLoading(true)
        try {
            const res = await fetch(`${API_URL}/api/auth/forgot-password`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            })

            const data = await res.json()
            if (!res.ok) {
                // serverseitige Fehlermeldung anzeigen, falls vorhanden
                throw new Error(data.message || 'Etwas ist schiefgelaufen.')
            }

            setMessage(
                'Wir haben dir den Code an die von dir angegebene E-Mail Adresse geschickt.'
            )

            // optional: nach X Sekunden zurück zum Login
            setTimeout(() => {
                router.push('/login')
            }, 5000)

        } catch (err) {
            setError(err.message || 'Etwas ist schiefgelaufen. Bitte versuche es erneut.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 px-6 py-12">
            <div className="w-full max-w-md bg-gray-800 p-8 rounded-lg shadow">
                <h2 className="text-2xl font-semibold text-white mb-4">Passwort vergessen</h2>
                <p className="text-sm text-gray-300 mb-6">
                    Bitte gebe deine E-Mail Adresse ein. Du erhälst einen Code zum wiederherstellen.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <label className="block">
                        <span className="text-sm text-gray-200">E‑Mail</span>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="du@gmail.com"
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
                            {loading ? 'Senden…' : 'Gesendet'}
                        </button>
                    </div>
                </form>

                <div className="mt-6 text-center">
                    <button
                        onClick={() => router.push('/login')}
                        className="text-sm text-indigo-300 hover:text-indigo-200 underline"
                    >
                        Zurück zur Anmeldung
                    </button>
                </div>
            </div>
        </div>
    )
}