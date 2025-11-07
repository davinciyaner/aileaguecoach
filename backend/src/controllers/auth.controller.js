import bcrypt from "bcrypt";
import User from "../models/auth.model.js";
import Profile from "../models/profile.model.js";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import nodemailer from "nodemailer";

import dotenv from "dotenv";
dotenv.config();


const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
    },
});

export const register = async (req, res) => {
    try {

        const {email, username, password} = req.body;

        const existingUser = await User.findOne({$or: [{email}, {username}]});
        if (existingUser) {
            return res.status(400).json({message: "E-Mail oder Benutzername existiert bereits."});
        }

        const hashPassword = bcrypt.hashSync(password, 10);

        const newUser = new User({email, username, password: hashPassword});
        await newUser.save()

        await Profile.create({
            userId: newUser._id,
            username: username,
            location: "",
            rank: ""
        })

        return res.status(201).json({message: "Erfolgreich registriert."});
    } catch (error) {
        return res.status(400).json({message: "Etwas ist schiefgelaufen. Bitte versuche es erneut."});
    }
}

export const login = async (req, res) => {
    try {
        const {username, password} = req.body;
        const user = await User.findOne({username});

        if (!user) return res.status(400).json({message: "Benutzername nicht gefunden."});

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) return res.status(400).json({message: "Falsches Passwort. Bitte versuche es erneut."});

        const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: "1h" });

        return res.status(201).json({
            message: "User successfully logged in.",
            token: token,
            user: { id: user._id, username: user.username },
            Profile
        });
    } catch (error) {
        return res.status(400).json({message: "Serverfehler"});
    }
}

export const getMe = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password"); // alle wichtigen Felder
        const profile = await Profile.findOne({ userId: req.user.id });

        if (!user) return res.status(404).json({ message: "User nicht gefunden." });

        return res.status(200).json({
            user,
            profile: profile || {}
        });
    } catch (error) {
        return res.status(500).json({ message: "Server error" });
    }
};


export const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "Dieser Benutzername mit dieser E-Mail Adresse existiert nicht." });

        const resetToken = crypto.randomBytes(32).toString("hex");
        const resetTokenExpires = Date.now() + 10 * 60 * 1000;

        user.resetPasswordToken = resetToken;
        user.resetPasswordExpires = resetTokenExpires;
        await user.save();

        const resetUrl = `${process.env.CLIENT_URL}/reset-password?token=${resetToken}`;

        await transporter.sendMail({
            from: `"AI Hans League of Legends Coach" <${process.env.GMAIL_USER}>`,
            to: email,
            subject: "Reset your password",
            html: `
                <h2>Password Reset Request</h2>
                <p>Click the link below to reset your password (valid for 10 minutes):</p>
                <a href="${resetUrl}">${resetUrl}</a>
                <p>If you did not request this, please ignore this email.</p>
            `,
        })

        return res.status(200).json({ message: "Der Code wurde an deine E-Mail Adresse verschickt." });
    } catch (error) {
        return res.status(400).json({ message: "Server error" });
    }
};

export const resetPassword = async (req, res) => {
    try {
        const { token, newPassword } = req.body;

        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() }, // Token ist noch gültig
        });

        if (!user)
            return res.status(400).json({ message: "Falscher oder abgelaufender Code." });

        // Neues Passwort speichern
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;

        // Token löschen
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        await user.save();

        return res.status(200).json({ message: "Passwort wurde erfolgreich geändert." });
    } catch (error) {
        return res.status(500).json({ message: "Server error." });
    }
};