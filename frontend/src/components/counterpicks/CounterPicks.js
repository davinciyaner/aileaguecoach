"use client";
import React, { useEffect, useState } from "react";
import { DndContext, useDraggable, useDroppable } from "@dnd-kit/core";
import Footer from "@/components/footer/Footer";
import Navbar from "@/components/navbar/Navbar";

// --- 🔹 Drag & Drop Komponenten ---
function Draggable({ id, children }) {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });
    const style = transform ? { transform: `translate(${transform.x}px, ${transform.y}px)` } : undefined;
    return (
        <div
            ref={setNodeRef}
            style={style}
            {...listeners}
            {...attributes}
            className="cursor-grab active:cursor-grabbing"
        >
            {children}
        </div>
    );
}

function Droppable({ id, children }) {
    const { isOver, setNodeRef } = useDroppable({ id });
    const borderColor = isOver ? "border-blue-500" : "border-gray-700";
    return (
        <div
            ref={setNodeRef}
            className={`p-4 border-2 ${borderColor} rounded-2xl min-h-[120px] w-full flex flex-wrap justify-start items-start gap-2 transition-colors bg-gray-900`}
        >
            {children}
        </div>
    );
}

// --- 🔹 Hauptkomponente ---
export default function CounterPicks() {
    const [champions, setChampions] = useState([]);
    const [counters, setCounters] = useState([]);
    const [yourTeam, setYourTeam] = useState([]);
    const [enemyTeam, setEnemyTeam] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        async function loadData() {
            const champRes = await fetch("/api/champions");
            const mergedChampions = await champRes.json();
            setChampions(mergedChampions);
        }
        loadData();
    }, []);


    const filtered = champions.filter((c) => {
        if (!c.name) return false;

        const normalizedSearch = search.toLowerCase().replace(/'/g, "");
        const normalizedName = c.name.toLowerCase().replace(/'/g, "");

        return normalizedName.includes(normalizedSearch);
    });


    const addToTeam = (champ, team) => {
        if (team === "you" && yourTeam.length < 5 && !yourTeam.includes(champ))
            setYourTeam([...yourTeam, champ]);
        if (team === "enemy" && enemyTeam.length < 5 && !enemyTeam.includes(champ))
            setEnemyTeam([...enemyTeam, champ]);
    };

    const removeFromTeam = (champ, team) => {
        if (team === "you") setYourTeam(yourTeam.filter((c) => c.id !== champ.id));
        if (team === "enemy") setEnemyTeam(enemyTeam.filter((c) => c.id !== champ.id));
    };

    const handleDragEnd = (event) => {
        const { active, over } = event;
        if (!over) return;
        const champ = champions.find((c) => c.id === active.id);
        if (!champ) return;
        if (over.id === "yourTeam") addToTeam(champ, "you");
        if (over.id === "enemyTeam") addToTeam(champ, "enemy");
    };


    return (
        <div className="w-full flex flex-col">
            <Navbar minimal={true} />
        <div className="flex flex-col mt-20 items-center gap-6 p-6 sm:p-8 text-white">
            <h1 className="text-3xl font-bold text-center">Wähle deine Counter Picks</h1>

            {/* 🔍 Suchfeld */}
            <input
                type="text"
                placeholder="Champion suchen..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full max-w-lg p-2 border border-gray-600 rounded-lg bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {/* 🔹 Champion Pool */}
            <DndContext onDragEnd={handleDragEnd}>
                <div className="flex flex-wrap justify-center gap-3 max-w-7xl bg-gray-800 p-4 rounded-2xl">
                    {filtered.map((c) => (
                        <Draggable key={c.id} id={c.id}>
                            <div className="flex flex-col items-center bg-gray-700 p-2 rounded-xl w-[100px] hover:bg-gray-600 transition">
                                <img
                                    src={c.icon}
                                    alt={c.name}
                                    loading="lazy"
                                    className="rounded-md mb-1 object-cover w-12 h-12"
                                />
                                <span className="text-xs font-medium text-center">{c.name}</span>
                                <span className="text-[10px] text-gray-400 mt-0.5">
                                    Difficulty: {c.difficulty}
                                </span>
                            </div>
                        </Draggable>
                    ))}
                </div>

                {/* 🔹 Teams */}
                <div className="flex flex-col md:flex-row gap-6 w-full max-w-6xl mt-6">
                    {/* Dein Team */}
                    <div className="flex flex-col items-center gap-2 w-full md:w-1/2">
                        <h2 className="text-xl font-semibold text-green-400 mb-2">Dein Team</h2>
                        <Droppable id="yourTeam">
                            {yourTeam.map((c) => (
                                <div
                                    key={c.id}
                                    className="flex items-center gap-2 bg-gray-700 px-3 py-1 rounded-lg w-full sm:w-auto"
                                >
                                    <span>{c.name}</span>
                                    <button
                                        onClick={() => removeFromTeam(c, "you")}
                                        className="ml-2 text-red-400 hover:text-red-600 font-bold"
                                    >
                                        ×
                                    </button>
                                </div>
                            ))}
                        </Droppable>
                    </div>

                    {/* Gegnerteam */}
                    <div className="flex flex-col items-center gap-2 w-full md:w-1/2">
                        <h2 className="text-xl font-semibold text-red-400 mb-2">Gegnerteam</h2>
                        <Droppable id="enemyTeam">
                            {enemyTeam.map((c) => (
                                <div
                                    key={c.id}
                                    className="flex items-center gap-2 bg-gray-700 px-3 py-1 rounded-lg w-full sm:w-auto"
                                >
                                    <span>{c.name}</span>
                                    <button
                                        onClick={() => removeFromTeam(c, "enemy")}
                                        className="ml-2 text-red-400 hover:text-red-600 font-bold"
                                    >
                                        ×
                                    </button>
                                </div>
                            ))}
                        </Droppable>
                    </div>
                </div>
            </DndContext>

            {/* Counter Suggestions */}
            {enemyTeam.length > 0 && (
                <div className="gap-6 w-full max-w-6xl mt-6">
                    <h3 className="text-lg font-bold text-blue-400 mb-2">Beste Counter gegen dein Gegner</h3>

                    {enemyTeam.map((champ) => (
                        <div key={champ.id} className="mb-3">
                            <p className="font-semibold mb-1">{champ.name}</p>
                            <div className="flex gap-2 flex-wrap">
                                {champ.counters.slice(0, 5).map((counterName, index) => {
                                    if (!counterName) return null; // verhindert Fehler bei null/undefined

                                    // normalize: alles lowercase, Apostrophe entfernen
                                    const normalizedInput = counterName.toLowerCase().replace(/'/g, "");
                                    const counterChamp = champions.find(
                                        (c) => c.name.toLowerCase().replace(/'/g, "") === normalizedInput
                                    );
                                    return (
                                        <span
                                            key={index}
                                            className="bg-blue-600 px-2 py-1 rounded-md text-sm flex items-center gap-1"
                                        >
                                            {counterName}
                                            {counterChamp && (
                                                <span className="text-[10px] text-gray-300">
                                                    ({counterChamp.difficulty})
                                                </span>
                                            )}
                                        </span>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* ⚖️ Riot Credit */}
            <p className="text-xs text-gray-500 mt-20 text-center">
                Data and images provided by Riot Games. Riot Games, League of Legends and all associated properties are trademarks or registered trademarks of Riot Games, Inc.
            </p>

        </div>
            <div className="mt-20">
                <Footer />
            </div>
        </div>
    );
}
