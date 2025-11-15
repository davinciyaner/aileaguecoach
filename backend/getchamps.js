// Skript: generateChampionCounterJSON.js
// Lädt die Riot Champion JSON und erstellt deine Counter-JSON mit allen 171 Champions

import fs from 'fs';
import fetch from 'node-fetch';

async function generate() {
    const patchVersion = '14.23.1';
    const url = `https://ddragon.leagueoflegends.com/cdn/${patchVersion}/data/en_US/champion.json`;

    const res = await fetch(url);
    const data = await res.json();

    const champions = data.data;
    const counterJSON = {};

    for (const key in champions) {
        const champ = champions[key];
        counterJSON[champ.name] = {
            id: champ.id,
            name: champ.name,
            info: champ.info,        // attack, defense, magic, difficulty
            tags: champ.tags,        // array von Tags
            winrate: null,
            counters: Array(15).fill(null),
            tips: ""
        };
    }

    fs.writeFileSync('champions_counter.json', JSON.stringify(counterJSON, null, 2));
    console.log('champions_counter.json wurde erstellt!');
}

generate();