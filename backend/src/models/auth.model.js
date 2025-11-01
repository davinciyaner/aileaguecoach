import mongoose from "mongoose"


const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    plan: {
        type: String,
        enum: ["", "Iron", "Gold", "Challenger"],
        default: ""
    },
    resetPasswordToken: { type: String, default: null },
    resetPasswordExpires: { type: Date, default: null },
    createdAt: { type: Date, default: Date.now },
})

export default mongoose.model("User", userSchema)