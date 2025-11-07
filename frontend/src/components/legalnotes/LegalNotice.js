"use client";

import React from "react";
import Navbar from "../navbar/Navbar";

const LegalNotice = () => {
    return (
        <div className="min-h-screen bg-gray-900 text-gray-100">
            {/* 🧭 Navbar */}
            <div className="mt-20">
                <Navbar minimal={true} />
            </div>

            <main className="max-w-3xl mx-auto px-6 py-16">
                <h1 className="text-4xl font-bold text-white mb-6">Impressum</h1>
                <p className="text-gray-400 mb-12">
                    Angaben gemäß § 5 TMG und § 55 RStV
                </p>

                <section className="space-y-6 text-gray-300 leading-relaxed">
                    <div>
                        <h2 className="text-xl font-semibold text-indigo-400 mb-2">Verantwortlich</h2>
                        <p>
                            Max Mustermann
                            <br />
                            Musterstraße 12
                            <br />
                            12345 Musterstadt
                            <br />
                            Deutschland
                        </p>
                    </div>

                    <div>
                        <h2 className="text-xl font-semibold text-indigo-400 mb-2">Kontakt</h2>
                        <p>
                            E-Mail:{" "}
                            <a
                                href="mailto:kontakt@sia.ai"
                                className="text-indigo-400 hover:text-indigo-300"
                            >
                                kontakt@sia.ai
                            </a>
                            <br />
                            Telefon: +49 123 456789
                        </p>
                    </div>

                    <div>
                        <h2 className="text-xl font-semibold text-indigo-400 mb-2">Unternehmen</h2>
                        <p>
                            SIA Technologies UG (haftungsbeschränkt)
                            <br />
                            Geschäftsführer: Max Mustermann
                            <br />
                            Registergericht: Amtsgericht Musterstadt
                            <br />
                            Registernummer: HRB 123456
                            <br />
                            Umsatzsteuer-ID: DE123456789
                        </p>
                    </div>

                    <div>
                        <h2 className="text-xl font-semibold text-indigo-400 mb-2">Haftungsausschluss</h2>
                        <p>
                            Die Inhalte dieser Website wurden mit größter Sorgfalt erstellt. Für
                            die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können
                            wir jedoch keine Gewähr übernehmen.
                            <br />
                            Trotz sorgfältiger inhaltlicher Kontrolle übernehmen wir keine Haftung
                            für die Inhalte externer Links. Für den Inhalt der verlinkten Seiten
                            sind ausschließlich deren Betreiber verantwortlich.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-xl font-semibold text-indigo-400 mb-2">Urheberrecht</h2>
                        <p>
                            Alle Inhalte dieser Seite unterliegen dem deutschen Urheberrecht. Die
                            Vervielfältigung, Bearbeitung, Verbreitung und jede Art der
                            Verwertung außerhalb der Grenzen des Urheberrechts bedürfen der
                            schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
                        </p>
                    </div>
                </section>

                <footer className="mt-16 text-sm text-gray-500 border-t border-gray-800 pt-6">
                    © {new Date().getFullYear()} SIA Technologies UG (haftungsbeschränkt) – All rights reserved.
                </footer>
            </main>
        </div>
    );
};

export default LegalNotice;