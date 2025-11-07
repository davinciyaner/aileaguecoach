'use client'
import { useEffect, useState } from 'react'

export default function ResetPasswordPage() {
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')
    const [token, setToken] = useState('')
    const [loading, setLoading] = useState(false)

    // ✅ Token aus URL holen (z. B. /reset-password?token=xyz)
    useEffect(() => {
        const t = new URLSearchParams(window.location.search).get('token')
        if (t) setToken(t)
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setMessage('')
        if (password !== confirmPassword) {
            setMessage('Passwords do not match.')
            return
        }

        setLoading(true)
        try {
            const res = await fetch('http://localhost:3001/api/auth/resetPassword', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token, newPassword: password }),
            })

            const data = await res.json()
            if (res.ok) {
                setMessage('Password successfully reset! You can now log in.')
            } else {
                setMessage(`${data.message || 'Reset failed.'}`)
            }
        } catch (error) {
            setMessage('Server error. Please try again later.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 p-4">
            <form
                onSubmit={handleSubmit}
                className="bg-gray-900/60 backdrop-blur-md border border-gray-700 p-8 rounded-2xl w-full max-w-md shadow-xl"
            >
                <h1 className="text-2xl font-bold text-white mb-6 text-center">🔒 Reset Password</h1>

                {!token ? (
                    <p className="text-gray-400 text-center">Invalid or missing token.</p>
                ) : (
                    <>
                        <div className="mb-4">
                            <label className="block text-gray-400 mb-1">New Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-indigo-500"
                                placeholder="Enter new password"
                                required
                            />
                        </div>

                        <div className="mb-6">
                            <label className="block text-gray-400 mb-1">Confirm Password</label>
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-indigo-500"
                                placeholder="Confirm new password"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full py-2 rounded font-semibold transition ${
                                loading
                                    ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                                    : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                            }`}
                        >
                            {loading ? 'Resetting...' : 'Reset Password'}
                        </button>

                        {message && (
                            <p
                                className={`mt-4 text-center ${
                                    message.startsWith('')
                                        ? 'text-green-400'
                                        : message.startsWith('')
                                            ? 'text-red-400'
                                            : 'text-yellow-400'
                                }`}
                            >
                                {message}
                            </p>
                        )}
                    </>
                )}
            </form>
        </div>
    )
}