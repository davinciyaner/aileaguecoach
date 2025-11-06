"use client";

import React from "react";
import Navbar from "@/components/navbar/Navbar";

const PrivacyPolicy = () => {
    return (
        <div className="min-h-screen bg-gray-900 text-gray-100">
            <div className="mt-20">
                <Navbar minimal={true} />
            </div>

            <main className="max-w-4xl mx-auto px-6 py-16">
                <h1 className="text-4xl font-bold text-white mb-4">Datenschutzerklärung</h1>
                <p className="text-gray-400 mb-8">
                    Der Schutz Ihrer persönlichen Daten ist uns wichtig. Nachfolgend informieren wir Sie transparent über Art, Umfang und Zweck der Verarbeitung personenbezogener Daten.
                </p>

                <section className="space-y-6 text-gray-300">
                    <div>
                        <h2 className="text-2xl font-semibold text-indigo-400 mb-2">Verantwortlicher</h2>
                        <p className="leading-relaxed">
                            Hans AI Coach<br />
                            Geschäftsführer: Finn Paustian<br />
                            Am Rund 6, 23455 Lübeck<br />
                            E-Mail: <a href="mailto:hansaicoach@gmail.com" className="text-indigo-300 underline">hansaicoach@gmail.com</a>
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold text-indigo-400 mb-2">Welche Daten wir verarbeiten</h2>
                        <p className="leading-relaxed">
                            Wir verarbeiten z. B. Name, E-Mail, Benutzername, Profilangaben (z. B. In-Game-Name, Rang), technische Daten (IP, Browser, Logdaten) sowie Zahlungsbestätigungen (z. B. PayPal-Status). Sensible Daten werden nicht bewusst erhoben.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold text-indigo-400 mb-2">Zwecke & Rechtsgrundlagen</h2>
                        <p className="leading-relaxed">
                            Verarbeitung erfolgt zur Vertragsdurchführung (Art. 6 Abs. 1 lit. b DSGVO), zur Erfüllung rechtlicher Pflichten (lit. c) oder auf Basis berechtigter Interessen (lit. f), z. B. IT-Sicherheit oder Funktionserhalt der Plattform. Soweit erforderlich holen wir vorherige Einwilligungen ein.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold text-indigo-400 mb-2">PayPal</h2>
                        <p className="leading-relaxed text-gray-400 mb-2">
                            Zur Zahlungsabwicklung nutzen wir PayPal. Zahlungsdaten werden direkt an PayPal übermittelt; wir erhalten von PayPal lediglich Zahlungsbestätigungen. Weitere Infos:{" "}
                            <a
                                href="https://www.paypal.com/de/webapps/mpp/ua/privacy-full"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-indigo-300 underline"
                            >
                                PayPal Datenschutz
                            </a>
                            .
                        </p>
                        <p className="text-gray-400">
                            Hinweis: Wenn du per PayPal zahlst, können beim Aufruf der PayPal-Seite Cookies von PayPal gesetzt werden; diese Verarbeitung liegt in der Verantwortung von PayPal.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold text-indigo-400 mb-2">Hosting & Datenbank</h2>
                        <p className="leading-relaxed">
                            Unsere Infrastruktur (Frontend/Backend) wird bei europäischen Anbietern gehostet (z. B. Vercel / Render). Die Datenbank (MongoDB Atlas) ist verschlüsselt angebunden (TLS). Zugriffe erfolgen nur über gesicherte Verbindungen.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold text-indigo-400 mb-2">Cookies & ähnliche Technologien</h2>
                        <p className="leading-relaxed text-gray-400 mb-4">
                            Wir verwenden ausschließlich technisch notwendige Cookies, die für die Bereitstellung der Dienste erforderlich sind (z. B. Session-Cookies für Login, CSRF-Token, sicherheitsrelevante Cookies). Diese Cookies sind von der Einwilligungspflicht ausgenommen.
                        </p>

                        <div className="bg-gray-800 p-4 rounded-md border border-gray-700">
                            <h3 className="text-lg font-semibold text-white mb-2">Kurzfassung — Cookie-Status</h3>
                            <ul className="list-disc list-inside text-gray-300">
                                <li><strong>Funktionale Cookies:</strong> notwendig, ohne Einwilligung gesetzt.</li>
                                <li><strong>PayPal:</strong> PayPal kann beim Weiterleiten Cookies setzen — das erfolgt auf Seiten von PayPal.</li>
                                <li><strong>Tracking/Analytics:</strong> Derzeit kein Tracking (z. B. Google Analytics) eingebunden — deshalb kein Consent-Banner erforderlich.</li>
                            </ul>
                        </div>

                        <p className="text-gray-400 mt-3">
                            Falls wir zukünftig Analyse- oder Marketing-Tools einbinden, werden wir vorher eine ausdrückliche Einwilligung per Cookie-Banner einholen und die Datenschutzerklärung entsprechend aktualisieren.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold text-indigo-400 mb-2">Weitergabe & Drittanbieter</h2>
                        <p className="leading-relaxed">
                            Eine Weitergabe personenbezogener Daten erfolgt nur, wenn sie zur Vertragserfüllung notwendig ist (z. B. Zahlungsdienstleister), wir gesetzlich verpflichtet sind oder du eingewilligt hast. Mit unseren Dienstleistern bestehen Auftragsverarbeitungsverträge (AVV).
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold text-indigo-400 mb-2">Dauer der Speicherung</h2>
                        <p className="leading-relaxed">
                            Wir speichern personenbezogene Daten nur so lange, wie es für die Zwecke erforderlich oder gesetzlich vorgeschrieben ist (z. B. steuerrechtliche Aufbewahrungsfristen für Rechnungen).
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold text-indigo-400 mb-2">Ihre Rechte</h2>
                        <p className="leading-relaxed">
                            Sie haben das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit und Widerspruch. Zur Ausübung Ihrer Rechte kontaktieren Sie uns bitte unter <a href="mailto:legal@sia.ai" className="text-indigo-300 underline">legal@sia.ai</a>.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold text-indigo-400 mb-2">Sicherheitsmaßnahmen</h2>
                        <p className="leading-relaxed">
                            Wir setzen technische und organisatorische Maßnahmen ein, z. B. HTTPS, verschlüsselte Verbindungen, sichere Passwortspeicherung (Hashing) und Zugriffskontrollen, um Ihre Daten bestmöglich zu schützen.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold text-indigo-400 mb-2">Änderungen</h2>
                        <p className="leading-relaxed text-gray-400">
                            Diese Datenschutzerklärung kann angepasst werden. Die jeweils aktuelle Version ist auf dieser Seite verfügbar. Letzte Aktualisierung: November 2025.
                        </p>
                    </div>
                </section>

                <footer className="mt-12 text-sm text-gray-500 border-t border-gray-800 pt-6">
                    © {new Date().getFullYear()} Hans AI Coach
                </footer>
            </main>
        </div>
    );
};

export default PrivacyPolicy;