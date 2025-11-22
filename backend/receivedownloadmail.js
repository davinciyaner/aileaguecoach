import nodemailer from "nodemailer";

export const sendDownloadEmail = async (userInfo = {}) => {
    // Konfiguration des Transporters
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.GMAIL_USER, // z. B. deine.email@gmail.com
            pass: process.env.GMAIL_PASS, // App-Passwort
        },
    });

    const mailOptions = {
        from: `"AILEagueCoach" <${process.env.GMAIL_USER}>`,
        to: process.env.GMAIL_USER, // Empfänger (du selbst)
        subject: "New Software Download",
        html: `
      <h2>Someone downloaded your software!</h2>
      <p><strong>Version:</strong> ${userInfo.version || "unknown"}</p>
      <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
      <p><strong>IP (optional):</strong> ${userInfo.ip || "unknown"}</p>
    `,
    };

    await transporter.sendMail(mailOptions);
};