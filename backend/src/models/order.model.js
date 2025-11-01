import mongoose from 'mongoose';


const orderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    items: [
        {
            name: { type: String, required: true },
            quantity: { type: Number, required: true },
            price: { type: Number, required: true },
        }
    ],
    planType: { type: String },
    totalAmount: { type: Number, required: true },
    paymentStatus: { type: String, default: "pending" },
    paypalOrderId: { type: String },
    createdAt: { type: Date, default: Date.now },
})

export default mongoose.model("Order", orderSchema);