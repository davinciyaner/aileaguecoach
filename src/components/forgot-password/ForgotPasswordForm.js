'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function ForgotPasswordForm() {
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [error, setError] = useState('')
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)

    const validateEmail = (value) => {
        // einfache Email-Validation
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setMessage('')

        if (!email) {
            setError('Please enter your email adress')
            return
        }
        if (!validateEmail(email)) {
            setError('Please enter a valid email adress')
            return
        }

        setLoading(true)
        try {
            const res = await fetch('http://localhost:3001/api/auth/forgot-password', {
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
                'We have send you and email with a code.'
            )

            // optional: nach X Sekunden zurück zum Login
            setTimeout(() => {
                router.push('/login')
            }, 5000)

        } catch (err) {
            setError(err.message || 'Server error. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 px-6 py-12">
            <div className="w-full max-w-md bg-gray-800 p-8 rounded-lg shadow">
                <h2 className="text-2xl font-semibold text-white mb-4">Forgot password</h2>
                <p className="text-sm text-gray-300 mb-6">
                    Enter your email and we'll send you a link to reset your password.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <label className="block">
                        <span className="text-sm text-gray-200">E‑Mail</span>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@example.com"
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
                            {loading ? 'Sending…' : 'Send reset link'}
                        </button>
                    </div>
                </form>

                <div className="mt-6 text-center">
                    <button
                        onClick={() => router.push('/login')}
                        className="text-sm text-indigo-300 hover:text-indigo-200 underline"
                    >
                        Back to login
                    </button>
                </div>
            </div>
        </div>
    )
}