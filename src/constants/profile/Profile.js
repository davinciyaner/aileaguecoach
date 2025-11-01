"use client";
import { useEffect, useState } from "react";
import {useRouter} from "next/navigation";
import Navbar from "@/components/navbar/Navbar";

export default function Profile() {
    const router = useRouter();

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [form, setForm] = useState({
        username: "",
        email: "",
        leaguename: "",
        rank: ""
    });
    const [message, setMessage] = useState("");
    const [plan, setPlan] = useState("Bronze");

    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem("token");
            if (!token) return;

            try {
                const res = await fetch("http://localhost:3001/api/auth/me", {
                    headers: { "Authorization": `Bearer ${token}` },
                });
                if (!res.ok) throw new Error("Failed to fetch user");
                const data = await res.json();

                setUser(data.user);
                setForm({
                    username: data.user.username,
                    email: data.user.email,
                    leaguename: data.profile?.leaguename || "",
                    rank: data.profile?.rank || "",
                    location: data.profile?.location || "",
                });
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);


    const handleUpdate = async (field) => {
        setMessage("");
        try {
            const token = localStorage.getItem("token");
            const res = await fetch("http://localhost:3001/api/profile/update", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ [field]: form[field] }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.message || "Update failed");

            // Update form mit den aktuellen Backend-Daten
            setForm(prev => ({
                ...prev,
                ...data.profile,
                username: data.user.username, // wenn username geändert wurde
            }));

            // Optional auch user state updaten, falls du ihn woanders brauchst
            setUser(prev => ({ ...prev, username: data.user.username }));

            setMessage("Updated successfully!");
        } catch (err) {
            setMessage(`${err.message || err}`);
        }
    };



    if (loading)
        return <div className="text-center text-white mt-10">Loading...</div>;
    if (!user)
        return (
            <div className="text-center text-white mt-10">
                Please{" "}
                <a href="/login" className="text-indigo-400 font-semibold">
                    log in
                </a>{" "}
                to see your profile.
            </div>
        );

    return (
        <div className="min-h-screen bg-gray-900 text-gray-100 flex">
            <main className="flex-1 max-w-5xl mx-auto p-8">
                <div className="mt-20">
                    <Navbar minimal={true}/>
                </div>
                <h1 className="text-3xl font-bold mb-6">{form.username}'s profile</h1>
                <p className="text-gray-400 mb-10">
                    This information will be displayed publicly, so be careful what you share.
                </p>

                <div className="space-y-12">
                    <div className="flex justify-between items-center pb-4">
                        <div className="flex items-center gap-4 flex-1 border-b border-gray-700 pb-4">
                            <h3 className="font-semibold text-lg w-48">Username</h3>
                            <input
                                type="text"
                                value={form.username}
                                onChange={(e) => setForm({ ...form, username: e.target.value })}
                                className="bg-transparent px-50 py-2 text-white focus:border-indigo-500 transition"
                            />
                        </div>
                        <button
                            onClick={() => handleUpdate("username")}
                            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-lg font-semibold ml-4"
                        >
                            Update
                        </button>
                    </div>

                    <div className="flex justify-between items-center border-b border-gray-700 pb-4">
                        <div className="flex items-center gap-4 flex-1">
                            <h3 className="font-semibold text-lg w-48">E-Mail</h3>
                            <input
                                type="email"
                                value={form.email}
                                onChange={(e) => setForm({ ...form, email: e.target.value })}
                                className="bg-transparent px-50 py-2 text-white focus:border-indigo-500 transition"
                            />
                        </div>
                        <button
                            onClick={() => handleUpdate("email")}
                            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-lg font-semibold"
                        >
                            Update
                        </button>
                    </div>

                    <div className="flex justify-between items-center border-b border-gray-700 pb-4">
                        <div className="flex items-center gap-4 flex-1">
                            <h3 className="font-semibold text-lg w-48">League name</h3>
                            <input
                                type="text"
                                value={form.leaguename}
                                onChange={(e) => setForm({ ...form, leaguename: e.target.value })}
                                className="bg-transparent px-50 py-2 text-white focus:border-indigo-500 transition"
                            />
                        </div>
                        <button
                            onClick={() => handleUpdate("leaguename")}
                            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-lg font-semibold"
                        >
                            Update
                        </button>
                    </div>

                    <div className="flex justify-between items-center border-b border-gray-700 pb-4">
                        <div className="flex items-center gap-4 flex-1">
                            <h3 className="font-semibold text-lg w-48">Rank</h3>
                            <input
                                type="text"
                                value={form.rank}
                                onChange={(e) => setForm({ ...form, rank: e.target.value })}
                                className="bg-transparent px-50 py-2 text-white focus:border-indigo-500 transition"
                            />
                        </div>
                        <button
                            onClick={() => handleUpdate("rank")}
                            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-lg font-semibold"
                        >
                            Update
                        </button>
                    </div>

                    <div className="border-b border-gray-700 pb-4">
                        <h3 className="font-semibold text-lg mb-2">Plan</h3>
                        <p className="text-gray-400 mb-3">
                            Your current plan:{" "}
                            <span className="text-indigo-400 font-medium">
                                {user.plan || "No plan yet"}
                            </span>
                        </p>
                        <div className="flex gap-3">
                            {user.plan === "" && (
                                <button
                                    onClick={() => router.push("/checkout?tier=iron")}
                                    className="px-4 py-2 bg-yellow-950 hover:bg-yellow-800 rounded-lg font-semibold"
                                >
                                    Upgrade to Iron – 4,99 €/month · Unlock stats tracking
                                </button>
                            )}
                            {user.plan === "Iron" && (
                                <button
                                    onClick={() => router.push("/checkout?tier=gold")}
                                    className="px-4 py-2 bg-yellow-400 hover:bg-yellow-500 rounded-lg font-semibold"
                                >
                                    Upgrade to Gold – 9,99 €/month · Community Discord
                                </button>
                            )}
                            {user.plan === "Gold" && (
                                <button
                                    onClick={() => router.push("/checkout?tier=challenger")}
                                    className="px-4 py-2 bg-purple-700 hover:bg-purple-600 rounded-lg font-semibold"
                                >
                                    Upgrade to Challenger – 19,99 €/month · 24/7 Support + Friend Invite
                                </button>
                            )}
                            {user.plan === "Challenger" && (
                                <p className="text-green-400 font-medium">
                                    You already have the highest plan
                                </p>
                            )}
                        </div>
                    </div>
                    <section>
                        <h2 className="text-2xl font-semibold text-indigo-400 mb-4">Billing</h2>
                        <p className="text-gray-400">Your invoices and payment history will appear here soon.</p>
                    </section>
                </div>

                {message && <div className="mt-6 text-sm text-gray-300">{message}</div>}
            </main>
        </div>
    );
}