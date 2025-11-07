"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Navbar from "../navbar/Navbar";

export default function CheckoutForm() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const rawTier = searchParams.get("tier") || "iron";

    const plans = {
        iron: { name: "Hardstuck", price: 4.99 },
        gold: { name: "Wanna Climb", price: 9.99 },
        challenger: { name: "Go Pro", price: 19.99 },
    };

    const selectedPlan = plans[rawTier] || plans.iron;

    const [loading, setLoading] = useState(false);
    const [loggedInUser, setLoggedInUser] = useState(null);
    const [subscriptionStatus, setSubscriptionStatus] = useState(null); // active, cancelled, pending, none
    const [expiryDate, setExpiryDate] = useState(null);
    const [message, setMessage] = useState("");

    // Fetch user und Subscription-Status
    const fetchUser = async () => {
        const token = localStorage.getItem("token");
        if (!token) return;

        try {
            const res = await fetch("http://localhost:3001/api/auth/me", {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (!res.ok) throw new Error("Failed to fetch user");
            const data = await res.json();
            setLoggedInUser(data.user);
            setSubscriptionStatus(data.user.status || null);
            setExpiryDate(data.user.expiryDate || null);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    // Nach PayPal-Redirect den aktuellen Status laden
    useEffect(() => {
        const status = searchParams.get("status");
        if (status === "success") {
            fetchUser();
            setMessage("Subscription successfully created!");
        }
    }, [searchParams]);

    const handleSubscribe = async () => {
        if (!loggedInUser) {
            router.push("/login");
            return;
        }

        setLoading(true);
        try {
            const res = await fetch("http://localhost:3001/api/subscribe/create-subscription", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify({
                    userId: loggedInUser._id,
                    plan: rawTier,
                    email: loggedInUser.email,
                }),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.message);

            // PayPal Approval URL öffnen
            window.location.href = data.approveUrl;
        } catch (err) {
            alert(err.message);
            setLoading(false);
        }
    };

    const handleCancelSubscription = async () => {
        if (!loggedInUser) return;

        setLoading(true);
        try {
            const res = await fetch("http://localhost:3001/api/subscribe/cancel-subscription", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify({ userId: loggedInUser._id }),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.message);

            setSubscriptionStatus("cancelled");
            setExpiryDate(data.expiryDate);
            setMessage(`Subscription cancelled. Access until ${new Date(data.expiryDate).toLocaleDateString()}`);
        } catch (err) {
            alert(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="mt-20">
                <Navbar minimal={true} />
            </div>

            <div className="space-y-4 max-w-xl mx-auto">
                <div className="flex justify-between text-gray-300">
                    <span>{selectedPlan.name} x 1</span>
                    <span>{selectedPlan.price.toFixed(2)} € / month</span>
                </div>

                <div className="flex justify-between font-bold text-white mt-2">
                    <span>Total:</span>
                    <span>{selectedPlan.price.toFixed(2)} € / month</span>
                </div>

                {message && (
                    <div className={`mt-4 text-sm font-medium ${subscriptionStatus === "cancelled" ? "text-red-500" : "text-green-500"}`}>
                        {message}
                    </div>
                )}

                {/* Wenn keine aktive Subscription */}
                {(!subscriptionStatus || subscriptionStatus === "none" || subscriptionStatus === "pending") && (
                    <button
                        onClick={handleSubscribe}
                        disabled={loading}
                        className="w-full bg-indigo-500 hover:bg-indigo-400 text-white py-3 rounded-md font-semibold transition"
                    >
                        {loading ? "Redirecting to PayPal..." : `Subscribe to ${selectedPlan.name}`}
                    </button>
                )}

                {/* Aktive Subscription */}
                {subscriptionStatus === "active" && (
                    <div className="mt-4">
                        <p className="text-gray-300 mb-2">
                            You are subscribed to {selectedPlan.name}.
                            {expiryDate && subscriptionStatus === "cancelled" && ` Access until ${new Date(expiryDate).toLocaleDateString()}`}
                        </p>
                        <button
                            onClick={handleCancelSubscription}
                            disabled={loading}
                            className="w-full bg-red-600 hover:bg-red-500 text-white py-2 rounded-md font-semibold transition"
                        >
                            Cancel Subscription
                        </button>
                    </div>
                )}

                {/* Subscription gekündigt, Zugriff läuft noch */}
                {subscriptionStatus === "cancelled" && expiryDate && (
                    <p className="text-gray-300 mt-2">
                        Access until {new Date(expiryDate).toLocaleDateString()}
                    </p>
                )}
            </div>
        </div>
    );
}