"use client";


import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";


export default function Profile() {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [form, setForm] = useState({
        username: "",
        email: "",
        leaguename: "",
        rank: "",
    });
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("");
    //const [billing, setBilling] = useState([]);

    /*const planOrder = ["iron", "gold", "challenger"];
    const planDetails = {
        iron: { label: "Iron", price: 4.99, desc: "Unlock stats tracking" },
        gold: { label: "Gold", price: 9.99, desc: "Community Discord" },
        challenger: { label: "Challenger", price: 19.99, desc: "24/7 Support + Friend Invite" },
    };*/

    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem("token");
            if (!token) return;

            try {
                const resUser = await fetch("http://localhost:3001/api/auth/me", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                if (!resUser.ok) throw new Error("Failed to fetch user");
                const dataUser = await resUser.json();
                setUser(dataUser.user);

                setForm({
                    username: dataUser.user.username,
                    email: dataUser.user.email,
                    leaguename: dataUser.profile?.leaguename || "",
                    rank: dataUser.profile?.rank || "",
                    location: dataUser.profile?.location || "",
                });

                const resBilling = await fetch("http://localhost:3001/api/billing", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                //if (!resBilling.ok) throw new Error("Failed to fetch billing");
                //const dataBilling = await resBilling.json();
                //setBilling(dataBilling.orders || []);
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

            setForm((prev) => ({ ...prev, ...data.profile, username: data.user.username }));
            setUser((prev) => ({ ...prev, username: data.user.username }));

            setMessage("Aktualisierung erfolgreich.");
            setMessageType("success");
        } catch (err) {
            setMessage(`${err.message || err}`);
            setMessageType("error");
        }
    };

    if (loading)
        return <div className="text-center text-white mt-10">Lädt...</div>;
    if (!user)
        return (
            <div className="text-center text-white mt-10">
                Bitte{" "}
                <a href="/login" className="text-indigo-400 font-semibold">
                    melde dich an
                </a>{" "}
                um dein Profil zu sehen.
            </div>
        );

    //const currentPlan = (user.plan || "").toLowerCase();

    //const nextPlanIndex = planOrder.indexOf(currentPlan) + 1;
    //const nextPlan = planOrder[nextPlanIndex] || null;

    return (
        <div>
        <div className="min-h-screen bg-gray-900 text-gray-100 flex">
            <main className="flex-1 max-w-5xl mx-auto p-8">
                <div className="mt-20">
                    <Navbar minimal={true} />
                </div>
                <h1 className="text-3xl font-bold mb-6">{form.username}'s Profil</h1>

                <div className="space-y-12">
                    {["username", "email", "leaguename", "rank"].map((field) => (
                        <div
                            key={field}
                            className="flex justify-between items-center border-b border-gray-700 pb-4"
                        >
                            <div className="flex items-center gap-4 flex-1">
                                <h3 className="font-semibold text-lg w-48">
                                    {field.charAt(0).toUpperCase() + field.slice(1)}
                                </h3>
                                <input
                                    type={field === "email" ? "email" : "text"}
                                    value={form[field]}
                                    onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                                    className="bg-transparent px-50 py-2 text-white focus:border-indigo-500 transition"
                                />
                            </div>
                            <button
                                onClick={() => handleUpdate(field)}
                                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-lg font-semibold"
                            >
                                aktualisieren
                            </button>
                        </div>
                    ))}

                    {/*<div className="border-b border-gray-700 pb-4">
                        <h3 className="font-semibold text-lg mb-2">Plan</h3>
                        <p className="text-gray-400 mb-3">
                            Your current plan:{" "}
                            <span className="text-indigo-400 font-medium">{planDetails[currentPlan]?.label || "No plan yet"}</span>
                        </p>
                        <div className="flex gap-3">
                            {nextPlan ? (
                                <button
                                    onClick={() => router.push(`/checkout?tier=${nextPlan}`)}
                                    className={`px-4 py-2 rounded-lg font-semibold ${
                                        nextPlan === "iron" ? "bg-yellow-950 hover:bg-yellow-800" :
                                            nextPlan === "gold" ? "bg-yellow-400 hover:bg-yellow-500" :
                                                "bg-purple-700 hover:bg-purple-600"
                                    }`}
                                >
                                    Upgrade to {planDetails[nextPlan].label} – {planDetails[nextPlan].price} €/month · {planDetails[nextPlan].desc}
                                </button>
                            ) : (
                                <p className="text-green-400 font-medium">You already have the highest plan</p>
                            )}
                        </div>
                    </div>

                    <div className="mt-8">
                        <h2 className="text-2xl font-semibold text-indigo-400 mb-4">
                            Billing History
                        </h2>
                        {billing.length === 0 ? (
                            <p className="text-gray-400">No billing history yet.</p>
                        ) : (
                            <div className="border-l-2 border-indigo-400 pl-4 space-y-4">
                                {billing.map((order) => (
                                    <div key={order._id} className="relative">
                                        <div className="absolute -left-2 top-1 w-4 h-4 rounded-full bg-indigo-400"></div>
                                        <p className="text-gray-300 font-medium">
                                            {order.items[0]?.name} - {order.totalAmount.toFixed(2)} €
                                        </p>
                                        <p className="text-gray-500 text-sm">
                                            Status:{" "}
                                            <span
                                                className={
                                                    order.paymentStatus === "paid" ? "text-green-500" : "text-red-500"
                                                }
                                            >
                        {order.paymentStatus}
                      </span>
                                        </p>
                                        <p className="text-gray-400 text-sm">
                                            {new Date(order.createdAt).toLocaleDateString()}
                                            {order.expiryDate &&
                                                ` - Access until ${new Date(order.expiryDate).toLocaleDateString()}`}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>*/}
                </div>

                {message && (
                    <div
                        className={`mt-6 text-sm font-medium ${
                            messageType === "success" ? "text-green-500" : "text-red-500"
                        }`}
                    >
                        {message}
                    </div>
                )}
            </main>
        </div>
            <Footer />
        </div>
    );
}