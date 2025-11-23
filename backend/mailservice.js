import { Resend } from "resend";
import dotenv from "dotenv";
dotenv.config();

const resend = new Resend(process.env.EMAIL);

export const sendEmail = async ({ to, subject, html }) => {
    try {
        await resend.emails.send({
            from: process.env.FROM || "hansleaguecoach@gmail.com",
            to,
            subject,
            html,
        });
        console.log("Email sent successfully");
    } catch (error) {
        console.error("Email send error:", error);
    }
};