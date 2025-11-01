"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function CheckoutSuccess() {
    const router = useRouter();
    const { token } = router.query; // PayPal sendet orderId als "token"
    const [message, setMessage] = useState("Processing payment...");

    useEffect(() => {
        if (!token) return;

        const capturePayment = async () => {
            try {
                const res = await fetch("http://localhost:3001/api/orders/capture", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ orderId: token })
                });
                const data = await res.json();
                if (!res.ok) throw new Error(data.message);
                setMessage("Payment successful! Thank you for your order.");
            } catch (err) {
                setMessage("Payment failed: " + err.message);
            }
        };

        capturePayment();
    }, [token]);

    return (
        <div className="max-w-xl mx-auto mt-10 bg-gray-800 p-10 rounded-2xl text-center text-white">
            <h2 className="text-3xl font-bold mb-4">{message}</h2>
        </div>
    );
}
