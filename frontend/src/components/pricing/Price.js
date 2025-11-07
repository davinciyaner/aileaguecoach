/*"use client"

import React from 'react';
import { CheckIcon } from "@heroicons/react/16/solid";

const tiers = [
    {
        name: 'Hardstuck',
        id: 'iron',
        href: '/checkout?tier=iron',
        priceMonthly: '4,99 €',
        description: "Still stuck in Bronze? No worries - even pros start somewhere. Small price, big potential and cheaper than your daily caffeine habit.",
        features: ['Track unlimited games'],
        featured: false,
    },
    {
        name: 'Wanna Climb',
        id: 'gold',
        href: '/checkout?tier=gold',
        priceMonthly: '9,99 €',
        description: 'Ten bucks a month? Stop being the support main - it’s time to carry yourself. More games, more insights, less inting.',
        features: ['Track unlimited games', 'Community Discord'],
        featured: true,
    },
    {
        name: 'Go Pro',
        id: 'challenger',
        href: '/checkout?tier=challenger',
        priceMonthly: '19,99 €',
        description: "Winners invest in their growth. €19.99 a month isn’t a cost — it’s your statement that you’re done playing small.",
        features: ['Track unlimited games', 'Community Discord', '24/7 support', 'friend invite'],
        featured: false,
    },
];

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

const Price = () => {
    return (
        <div className="relative isolate bg-gray-900 px-6 py-24 sm:py-32 lg:px-8">
            <div className="mx-auto max-w-4xl text-center">
                <h2 id="price" className="text-base font-semibold text-indigo-400">Pricing</h2>
                <p className="mt-2 text-5xl font-semibold tracking-tight text-white sm:text-6xl">
                    Choose the right plan for you
                </p>
                <p className="mx-auto mt-6 max-w-2xl text-lg font-medium text-gray-400">
                    Choose an affordable plan that’s packed with the best features for you
                </p>
            </div>

            <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 auto-rows-fr">
                {tiers.map((tier) => (
                    <div
                        key={tier.id}
                        className={classNames(
                            'flex flex-col justify-between rounded-3xl bg-gray-800 p-8 ring-1 ring-white/10 shadow-lg transition-transform hover:scale-105',
                            'duration-300'
                        )}
                    >
                        <div>
                            <h3
                                id={tier.id}
                                className="text-indigo-400 text-base font-semibold"
                            >
                                {tier.name}
                            </h3>
                            <p className="mt-4 flex items-baseline gap-x-2">
                <span className="text-white text-5xl font-semibold tracking-tight">
                  {tier.priceMonthly}
                </span>
                                <span className="text-gray-400 text-base">/month</span>
                            </p>
                            <p className="mt-6 text-gray-300 text-base">
                                {tier.description}
                            </p>
                            <ul className="mt-8 space-y-3 text-gray-300 text-sm">
                                {tier.features.map((feature) => (
                                    <li key={feature} className="flex gap-x-3">
                                        <CheckIcon className="h-6 w-5 text-indigo-400" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <a
                            href={`/checkout?tier=${tier.id}`}
                            aria-describedby={tier.id}
                            className="mt-8 block rounded-md bg-indigo-500 px-3.5 py-2.5 text-center text-sm font-semibold text-white hover:bg-indigo-400"
                        >
                            Get started today
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Price;*/
