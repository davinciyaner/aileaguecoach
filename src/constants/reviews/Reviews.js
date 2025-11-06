"use client";

import React, { useState, useEffect } from "react";
import { StarIcon } from "@heroicons/react/24/solid";
import { jwtDecode } from "jwt-decode"; // ✅ richtig importiert

export default function Reviews() {
    const [reviews, setReviews] = useState([]);
    const [stats, setStats] = useState([]);
    const [totalReviews, setTotalReviews] = useState(0);
    const [showForm, setShowForm] = useState(false);
    const [rating, setRating] = useState(5);
    const [hoverRating, setHoverRating] = useState(0);
    const [name, setName] = useState("");
    const [comment, setComment] = useState("");
    const [expanded, setExpanded] = useState({});
    const [loggedInUser, setLoggedInUser] = useState(null);

    // ✅ User beim Mounten laden
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) return;

        try {
            const decoded = jwtDecode(token);
            // optional: von deinem Backend mehr Userdaten holen
            setLoggedInUser(decoded);
            setName(decoded.username || decoded.name || ""); // automatisch ins Name-Feld eintragen
        } catch (err) {
            console.error("Invalid token:", err);
        }
    }, []);

    // ✅ Reviews und Stats laden
    const fetchData = async () => {
        const res = await fetch("http://localhost:3001/api/reviews/stats");
        const data = await res.json();
        setReviews(data.reviews);
        setStats(data.stats);
        setTotalReviews(data.total);
    };

    useEffect(() => {
        fetchData();
    }, []);

    // ✅ Nur eingeloggte User dürfen absenden
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!loggedInUser) return alert("Melde dich an, um eine Bewertung zu schreiben.");
        if (!comment) return alert("Schreib eine Bewertung");

        const res = await fetch("http://localhost:3001/api/reviews", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name: name || loggedInUser.username || loggedInUser.name,
                rating,
                comment,
            }),
        });

        const data = await res.json();
        if (res.ok) {
            setComment("");
            setRating(5);
            setHoverRating(0);
            setShowForm(false);
            fetchData();
            alert("Danke für deine Bewertung");
        } else {
            alert(data.message);
        }
    };

    const toggleExpanded = (id) => {
        setExpanded((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    return (
        <section className="bg-gray-900 py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div id="reviews" className="mx-auto max-w-2xl text-center mb-12">
                    <h2 className="text-base font-semibold text-indigo-400">Kundenbewertungen</h2>
                    <p className="mt-2 text-4xl font-semibold text-white sm:text-5xl">
                        {totalReviews
                            ? (reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews).toFixed(1)
                            : 0} von 5 Sternen
                    </p>
                    <p className="mt-1 text-gray-400">{totalReviews} Kundenbewertungen</p>
                </div>

                {/* Review schreiben */}
                <div className="text-center mb-12">
                    {loggedInUser ? (
                        <button
                            onClick={() => setShowForm(!showForm)}
                            className="rounded-md bg-indigo-500 px-6 py-2 text-white font-semibold hover:bg-indigo-400 transition"
                        >
                            {showForm ? "Bewertungen schließen" : "Schreibe eine Bewertung"}
                        </button>
                    ) : (
                        <p className="text-gray-400">
                            Please <span className="text-indigo-400 font-semibold">Anmelden</span> um eine Bewertung zu schreiben.
                        </p>
                    )}
                </div>

                {showForm && loggedInUser && (
                    <form
                        onSubmit={handleSubmit}
                        className="max-w-2xl mx-auto mb-12 space-y-4 bg-gray-800 p-6 rounded-xl shadow-md"
                    >
                        <input
                            type="text"
                            placeholder="Dein Username"
                            value={name}
                            readOnly
                            className="w-full rounded-md bg-gray-700/50 px-3 py-2 text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 cursor-not-allowed"
                        />
                        <div className="flex items-center space-x-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <StarIcon
                                    key={star}
                                    className={`h-6 w-6 cursor-pointer transition-colors duration-200 ${
                                        star <= (hoverRating || rating) ? "text-yellow-400" : "text-gray-500"
                                    }`}
                                    onClick={() => setRating(star)}
                                    onMouseEnter={() => setHoverRating(star)}
                                    onMouseLeave={() => setHoverRating(0)}
                                />
                            ))}
                        </div>
                        <textarea
                            placeholder="Schreibe deine Bewertung hier..."
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            className="w-full rounded-md bg-gray-700/50 px-3 py-2 text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500"
                        />
                        <button
                            type="submit"
                            className="rounded-md bg-indigo-500 px-6 py-2 text-white font-semibold hover:bg-indigo-400 transition"
                        >
                            Bewertung abgeben
                        </button>
                    </form>
                )}

                {/* Reviews anzeigen */}
                <div className="max-w-4xl mx-auto grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {reviews.map((rev) => {
                        const text = rev.comment || "";
                        const isLong = text.length > 250;
                        const displayText = expanded[rev._id] ? text : text.slice(0, 250);

                        return (
                            <div key={rev._id} className="bg-gray-800 rounded-2xl p-6 shadow-md hover:shadow-xl transition">
                                <div className="flex items-center mb-2">
                                    {[...Array(5)].map((_, i) => (
                                        <StarIcon
                                            key={i}
                                            className={`h-5 w-5 ${i < rev.rating ? "text-yellow-400" : "text-gray-500"}`}
                                        />
                                    ))}
                                    <span className="ml-2 text-gray-400 text-sm">{rev.name || "Anonymous"}</span>
                                </div>

                                <p className="text-gray-300">
                                    {displayText}
                                    {isLong && !expanded[rev._id] && "…"}
                                </p>

                                {isLong && (
                                    <button
                                        onClick={() => toggleExpanded(rev._id)}
                                        className="mt-2 text-indigo-400 hover:text-indigo-300 text-sm"
                                    >
                                        {expanded[rev._id] ? "Weniger anzeigen" : "Mehr anzeigen"}
                                    </button>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}