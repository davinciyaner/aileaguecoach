"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import CheckoutForm from "@/components/checkout/CheckoutForm";

export default function CheckoutPage() {
    const searchParams = useSearchParams();
    const selectedTier = (searchParams.get("tier") || "none").replace("tier-", "");



    // Einfacher "Warenkorb" basierend auf ausgewähltem Tier
    const tierPrices = {
        hobby: 4.99,
        enterprise: 9.99,
        pro: 19.99,
    };


    const cartItems =
        selectedTier !== "none"
            ? [{ id: selectedTier, name: selectedTier.toUpperCase(), price: tierPrices[selectedTier], quantity: 1 }]
            : [];

    return (
        <div className="max-w-3xl mx-auto mt-16 bg-gray-900 p-8 rounded-xl shadow-lg text-white">
            <h2 className="text-3xl font-bold mb-6">Checkout</h2>
            {selectedTier === "none" ? (
                <p className="text-gray-300">No plan selected. Please go back and choose a plan.</p>
            ) : (
                <CheckoutForm cartItems={cartItems} />
            )}
        </div>
    );
}
