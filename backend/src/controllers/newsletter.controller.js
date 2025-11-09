import nodemailer from "nodemailer";
import Newsletter from "../models/newsletter.model.js";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
    },
});

export const subscribeNewsletter = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ message: "Bitte geben Sie eine E-Mail-Adresse an." });
        }

        const existingEmail = await Newsletter.findOne({ email });
        if (existingEmail) {
            return res
                .status(400)
                .json({ message: "Sie sind bereits für unseren Newsletter angemeldet." });
        }

        const subscriber = new Newsletter({ email });
        await subscriber.save();

        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_PASS,
            },
        });

        const mailOptions = {
            from: `"AI Hans League of Legends Coach" <${process.env.GMAIL_USER}>`,
            to: email,
            subject: "Willkommen beim AI Hans League of Legends Coach",
            html: `
        <h2>Willkommen in der AI Hans League of Legends Coach Community!</h2>
        <p>Sie sind nun angemeldet, um exklusive Updates, neue Features und Performance-Insights von Ihrem AI Hans League of Legends Coach zu erhalten.</p>
        <br/>
        <p>Bleiben Sie scharf,<br/>Ihr Hans-Team</p>
      `,
        };

        await transporter.sendMail(mailOptions);

        return res
            .status(200)
            .json({ message: "Erfolgreich für unseren Newsletter angemeldet." });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export const unsubscribeNewsletter = async (req, res) => {
    try {
        const { email } = req.query;

        if (!email) {
            return res.status(400).json({ message: "Bitte geben Sie eine E-Mail-Adresse an." });
        }

        const existing = await Newsletter.findOne({ email });
        if (!existing) {
            return res
                .status(404)
                .json({ message: "Diese E-Mail-Adresse ist nicht in unserer Abonnentenliste vorhanden." });
        }

        await Newsletter.deleteOne({ email });

        const mailOptions = {
            from: `"AI Hans League of Legends Coach" <${process.env.GMAIL_USER}>`,
            to: email,
            subject: "Abmeldung vom AI Hans League of Legends Coach",
            html: `
        <h3>Sie wurden erfolgreich abgemeldet.</h3>
        <p>Schade, dass Sie gehen! Falls dies ein Versehen war, können Sie sich jederzeit wieder anmelden, indem Sie unsere Website besuchen.</p>
        <br/>
        <a href="${process.env.CLIENT_URL}" target="_blank">Zurück zum AI Hans League of Legends Coach</a>
      `,
        };

        await transporter.sendMail(mailOptions);

        res.status(200).json({ message: "Erfolgreich abgemeldet." });
    } catch (error) {
        res.status(500).json({ message: "Serverfehler." });
    }
};