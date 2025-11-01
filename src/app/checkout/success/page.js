"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function CheckoutSuccess() {
    const searchParams = useSearchParams();
    const token = searchParams.get("token"); // PayPal sendet orderId als token
    const [message, setMessage] = useState("Processing payment...");
    const router = useRouter();

    useEffect(() => {
        if (!token) return;

        const capturePayment = async () => {
            try {
                const res = await fetch("http://localhost:3001/api/orders/capture", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ orderId: token }),
                });
                const data = await res.json();
                if (!res.ok) throw new Error(data.message);
                setMessage("Payment successful! Thank you for your order.");

                // Nach 3 Sekunden zurück zur Startseite
                setTimeout(() => {
                    router.push("/");
                }, 3000);
            } catch (err) {
                setMessage("Payment failed: " + err.message);
            }
        };

        capturePayment();
    }, [token, router]);

    return (
        <div className="max-w-xl mx-auto mt-10 bg-gray-800 p-10 rounded-2xl text-center text-white">
            <h2 className="text-3xl font-bold mb-4">{message}</h2>
            <p className="text-gray-300">{message.includes("successful") ? "You will be redirected shortly..." : null}</p>
        </div>
    );
}
