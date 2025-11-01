import mongoose from "mongoose";


const ProfileSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    location: {
        type: String,
        default: null,
    },
    leaguename: {
        type: String,
        default: null,
    },
    rank: {
        type: String,
        default: null,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

export default mongoose.model("Profile", ProfileSchema);