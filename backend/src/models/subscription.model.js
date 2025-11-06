import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

    // Details zum Plan
    planKey: { type: String, required: true }, // z.B. "iron", "gold", "challenger"
    planId: { type: String, required: true }, // PayPal Plan ID

    items: [
        {
            name: { type: String, required: true },
            quantity: { type: Number, default: 1 },
            price: { type: Number, required: true },
        }
    ],

    totalAmount: { type: Number, required: true },

    // Zahlungsstatus: pending, active, canceled, expired
    paymentStatus: { type: String, default: "pending" },

    // PayPal IDs
    paypalSubscriptionId: { type: String }, // PayPal Subscription ID
    paypalOrderId: { type: String },        // Optional, falls vorher ein Order-Flow genutzt wird

    // Zeitraum
    startDate: { type: Date },
    endDate: { type: Date },

    // Kündigung
    cancelAtPeriodEnd: { type: Boolean, default: false }, // true, wenn der User kündigt, aber noch bis Ende nutzt
    canceledAt: { type: Date },  // Zeitpunkt, wann die Subscription gekündigt wurde

    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

// Optional: pre-save Hook für updatedAt
subscriptionSchema.pre("save", function (next) {
    this.updatedAt = new Date();
    next();
});

export default mongoose.model("Subscription", subscriptionSchema);