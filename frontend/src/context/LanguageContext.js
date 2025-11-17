'use client'

import { createContext, useContext, useState, useEffect } from "react";

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
    const [language, setLanguageState] = useState("en");

    // Beim Mount prüfen, ob eine Sprache im localStorage gespeichert ist
    useEffect(() => {
        const storedLang = localStorage.getItem("language");
        if (storedLang) setLanguageState(storedLang);
    }, []);

    const setLanguage = (lng) => {
        setLanguageState(lng);
        localStorage.setItem("language", lng); // speichern für Reloads
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => useContext(LanguageContext);