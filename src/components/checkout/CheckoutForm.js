"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Navbar from "@/components/navbar/Navbar";

export default function CheckoutForm({ cartItems = [] }) {
    const searchParams = useSearchParams();
    const router = useRouter(); // ✅ für Navigation

    const rawTier = searchParams.get("tier");
    const tierMap = {
        "tier=iron": "iron",
        "tier=gold": "gold",
        "tier=challenger": "challenger",
    };

    const tier = searchParams.get("tier") || "iron";


    const [loading, setLoading] = useState(false);
    const [orderComplete, setOrderComplete] = useState(false);
    const [orderId, setOrderId] = useState(null);
    const [loggedInUser, setLoggedInUser] = useState(null);

    const plans = {
        iron: { name: "Hardstuck", price: 4.99 },
        gold: { name: "Wanna Climb", price: 9.99 },
        challenger: { name: "Go Pro", price: 19.99 },
    };

    const selectedPlan = plans[tier] || plans.iron;

    const cartItemsToPay = [
        {
            id: tier,
            name: selectedPlan.name,
            price: selectedPlan.price,
            quantity: 1,
        },
    ];

    const total = cartItemsToPay.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem("token");
            if (!token) return;

            try {
                const res = await fetch("http://localhost:3001/api/auth/me", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                });
                if (!res.ok) throw new Error("Failed to fetch user");
                const data = await res.json();
                setLoggedInUser(data.user);
            } catch (err) {
                console.error(err);
            }
        };

        fetchUser();
    }, []);

    const handlePayPalCheckout = async () => {
        // ✅ Wenn kein User, zur Login-Seite weiterleiten
        if (!loggedInUser) {
            router.push("/login");
            return;
        }

        setLoading(true);
        try {
            const res = await fetch("http://localhost:3001/api/orders/create", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    items: cartItemsToPay,
                    userId: loggedInUser._id,
                }),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.message);

            setOrderId(data.paypalOrderId);
            window.location.href = data.approveUrl;
        } catch (err) {
            alert(err.message);
            setLoading(false);
        }
    };

    const handleCapture = async () => {
        try {
            const res = await fetch("http://localhost:3001/api/orders/capture", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ orderId }),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.message);

            setOrderComplete(true);
        } catch (err) {
            alert(err.message);
        }
    };

    if (orderComplete) {
        return (
            <div className="max-w-xl mx-auto mt-8 bg-gray-800 p-10 rounded-2xl text-center text-white">
                <h2 className="text-3xl font-bold mb-4">Thank you for your order!</h2>
                <p className="text-gray-300">Your payment has been successfully processed.</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="mt-20">
                <Navbar minimal={true} />
            </div>

            <div className="space-y-4">
                {cartItemsToPay.map((item) => (
                    <div key={item.id} className="flex justify-between text-gray-300">
                        <span>
                            {item.name} x {item.quantity}
                        </span>
                        <span>{(item.price * item.quantity).toFixed(2)} €</span>
                    </div>
                ))}

                <div className="flex justify-between font-bold text-white mt-2">
                    <span>Total:</span>
                    <span>{total.toFixed(2)} €</span>
                </div>
            </div>

            <button
                onClick={handlePayPalCheckout}
                disabled={loading}
                className="w-full bg-indigo-500 hover:bg-indigo-400 text-white py-3 rounded-md font-semibold transition"
            >
                {loading
                    ? "Redirecting to PayPal..."
                    : !loggedInUser
                        ? "Please log in"
                        : "Pay with PayPal"}
            </button>

            {orderId && (
                <button
                    onClick={handleCapture}
                    className="mt-4 w-full bg-green-500 hover:bg-green-400 text-white py-2 rounded-md font-semibold transition"
                >
                    Capture Payment
                </button>
            )}
        </div>
    );
}