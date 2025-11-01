import nodemailer from "nodemailer";
import Newsletter from "../models/newsletter.model.js";
import dotenv from "dotenv";

dotenv.config();

// Ein einziger Transporter für alle Mail-Funktionen
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.GMAIL_USER,  // z.B. hansleaguecoach@gmail.com
        pass: process.env.GMAIL_PASS,  // App-Passwort
    },
});

export const subscribeNewsletter = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ message: "Email is required." });
        }

        const existingEmail = await Newsletter.findOne({ email });
        if (existingEmail) {
            return res
                .status(400)
                .json({ message: "You are already subscribed to our newsletter." });
        }

        const subscriber = new Newsletter({ email });
        await subscriber.save();

        const mailOptions = {
            from: `"AI Hans League of Legends Coach" <${process.env.GMAIL_USER}>`,
            to: email,
            subject: "Welcome to AI Hans League of Legends Coach",
            html: `
        <h2>Welcome to the AI Hans League of Legends Coach Community!</h2>
        <p>You're now subscribed to receive exclusive updates, new feature drops, and performance insights from your AI Hans League of Legends Coach.</p>
        <br/>
        <p>Stay sharp,<br/>The Hans Team</p>
      `,
        };

        await transporter.sendMail(mailOptions);

        return res
            .status(200)
            .json({ message: "Successfully subscribed to our Newsletter" });
    } catch (error) {
        console.error("Subscribe Error:", error);
        return res.status(500).json({ error: error.message });
    }
};

export const unsubscribeNewsletter = async (req, res) => {
    try {
        const { email } = req.query;

        if (!email) {
            return res.status(400).json({ message: "Email is required." });
        }

        const existing = await Newsletter.findOne({ email });
        if (!existing) {
            return res
                .status(404)
                .json({ message: "Email not found in subscriber list." });
        }

        await Newsletter.deleteOne({ email });

        const mailOptions = {
            from: `"AI Hans League of Legends Coach" <${process.env.GMAIL_USER}>`,
            to: email,
            subject: "You have unsubscribed from AI Hans League of Legends Coach ❌",
            html: `
        <h3>You've been successfully unsubscribed.</h3>
        <p>We’re sorry to see you go! If this was a mistake, you can rejoin anytime by visiting our website.</p>
        <br/>
        <a href="${process.env.CLIENT_URL}" target="_blank">Return to AI Hans League of Legends Coach</a>
      `,
        };

        await transporter.sendMail(mailOptions);

        res.status(200).json({ message: "Successfully unsubscribed." });
    } catch (error) {
        console.error("Unsubscribe Error:", error);
        res.status(500).json({ message: "Server error." });
    }
};
