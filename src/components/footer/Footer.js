"use client";
import React, { useState, useEffect } from "react";
import { Mail } from "lucide-react";

export default function Footer() {
    const [email, setEmail] = useState("");
    const [subscribed, setSubscribed] = useState(false);

    // Handle newsletter subscribe
    const handleSubscribe = async (event) => {
        event.preventDefault();
        if (!email) return alert("Please enter a valid email.");

        try {
            const res = await fetch("http://localhost:3001/api/subscribe/newsletter", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });
            const data = await res.json();
            alert(data.message);

            if (res.ok) {
                setSubscribed(true); // Mark as subscribed
            }
        } catch (err) {
            console.error(err);
            alert("Something went wrong.");
        }
    };

    // Handle newsletter unsubscribe
    const handleUnsubscribe = async () => {
        if (!email) return;
        try {
            const res = await fetch(
                `http://localhost:3001/api/subscribe/unsubscribe?email=${encodeURIComponent(email)}`
            );
            const data = await res.json();
            alert(data.message);
            if (res.ok) setSubscribed(false); // Mark as unsubscribed
        } catch (err) {
            console.error(err);
            alert("Something went wrong.");
        }
    };

    // Optional: auto-unsubscribe if email is in query params
    useEffect(() => {
        const queryEmail = new URLSearchParams(window.location.search).get("email");
        if (queryEmail) {
            setEmail(queryEmail);
            handleUnsubscribe();
        }
    }, []);

    return (
        <footer className="bg-gray-950 border-t border-gray-800">
            <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
                <div className="mx-auto max-w-3xl text-center mb-16">
                    <h2 className="text-2xl font-semibold text-white sm:text-3xl">
                        Stay ahead with Hans
                    </h2>
                    <p className="mt-4 text-gray-400">
                        Subscribe to our newsletter for exclusive updates, early access to new features, and performance tips from our AI coach.
                    </p>

                    {!subscribed ? (
                        <form className="mt-6 flex max-w-md mx-auto gap-x-3" onSubmit={handleSubscribe}>
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                className="min-w-0 flex-auto rounded-md border-0 bg-gray-800/50 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-gray-700 focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6"
                            />
                            <button
                                type="submit"
                                className="flex-none rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                            >
                                Subscribe
                            </button>
                        </form>
                    ) : (
                        <div className="mt-6 flex justify-center gap-x-3">
              <span className="text-gray-300 px-3.5 py-2.5 rounded-md bg-gray-800/50">
                Subscribed: {email}
              </span>
                            <button
                                onClick={handleUnsubscribe}
                                className="flex-none rounded-md bg-red-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500"
                            >
                                Unsubscribe
                            </button>
                        </div>
                    )}
                </div>

                <div className="border-t border-gray-800 pt-12 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="text-gray-400 text-sm text-center md:text-left">
                        © {new Date().getFullYear()} Hans AI Coach. All rights reserved.
                    </div>

                    <div className="flex space-x-6">
                        {/*<a href="#" className="text-gray-400 hover:text-indigo-400">
                            <Twitter className="h-5 w-5" />
                        </a>
                        <a href="#" className="text-gray-400 hover:text-indigo-400">
                            <Github className="h-5 w-5" />
                        </a>
                        <a href="#" className="text-gray-400 hover:text-indigo-400">
                            <Linkedin className="h-5 w-5" />
                        </a>*/}
                        <a href="mailto:hansleaguecoach@gmail.com" className="text-gray-400 hover:text-indigo-400">
                            <Mail className="h-5 w-5" />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}