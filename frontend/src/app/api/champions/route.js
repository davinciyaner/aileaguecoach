import { NextResponse } from "next/server";
import counterData from "../../../data/champions_counter.json";

export async function GET() {
    const patchVersion = "14.23.1";
    const url = `https://ddragon.leagueoflegends.com/cdn/${patchVersion}/data/en_US/champion.json`;
    const res = await fetch(url);
    const data = await res.json();

    const counterArray = Object.values(counterData);

    const champions = Object.values(data.data).map((c) => {
        const extra = counterArray.find(
            (x) => x.id === c.id || x.name.toLowerCase() === c.name.toLowerCase()
        );

        return {
            id: c.id,
            name: c.name,
            icon: `https://ddragon.leagueoflegends.com/cdn/${patchVersion}/img/champion/${c.image.full}`,
            difficulty: extra?.info?.difficulty || "N/A",
            tags: extra?.tags || [],
            tips: extra?.tips || "",
            counters: extra?.counters || [],
        };
    });

    return NextResponse.json(champions);
}