import Profile from '../models/profile.model.js';
import User from "../models/auth.model.js";
import bcrypt from "bcrypt";



export const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("username");
        const profile = await Profile.findById(req.params.id);

        if (!user) return res.status(404).json({ message: 'User nicht gefunden.' });

        return res.status(200).json({
            user,
            profile: profile || {}
        });
    } catch (error) {
        console.error(error);
        return res.status(401).json({ message: 'Abgemeldet. Bitte melde dich an.' });
    }
}

export const updateProfile = async (req, res) => {
    try {
        const { username, email, password, location, leaguename, rank } = req.body;

        const updateData = {};
        if (username) updateData.username = username;
        if (email) updateData.email = email;
        //if (leaguename) updateData.username = leaguename;
        if (password) updateData.password = await bcrypt.hash(password, 10);

        const updatedUser = await User.findByIdAndUpdate(req.user.id, updateData, { new: true }).select("username");

        const profileData = { username, email, location, leaguename, rank };
        const updatedProfile = await Profile.findOneAndUpdate(
            { userId: req.user.id },
            { $set: profileData },
            { new: true, upsert: true }
        );

        return res.status(200).json({
            message: "Profile erfolgreich aktualisiert.",
            user: updatedUser,
            profile: updatedProfile,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Update fehlgeschlagen.", error });
    }
};