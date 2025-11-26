import paypal from "@paypal/checkout-server-sdk";
import User from "../models/auth.model.js";
import dotenv from "dotenv";
dotenv.config();


const environment = new paypal.core.SandboxEnvironment(
    process.env.PAYPAL_CLIENT_ID,
    process.env.PAYPAL_CLIENT_SECRET
)

const client = new paypal.core.PayPalHttpClient(environment);

const planIds = {
    iron: process.env.PAYPAL_PLAN_IRON,
    gold: process.env.PAYPAL_PLAN_GOLD,
    challenger: process.env.PAYPAL_PLAN_CHALLENGER,
}

export const createSubscription = async (req, res) => {
    try {
        const { userId, plan } = req.body;
        const planId = planIds[plan];

        if (!planId) return res.status(400).json({ message: "Invalid plan" });

        const request = new paypal.subscription.SubscriptionsCreateRequest();
        request.requestBody({
            plan_id: planId,
            subscriber: {
                email_address: user.email,
            },
            application_context: {
                brand_name: "Hans AI Coach",
                return_url: "http://localhost:3000/checkout/success",
                cancel_url: "http://localhost:3000/checkout/cancel",
            }
        });

        const subscription = await client.execute(request);
        await User.findByIdAndUpdate(userId, {
            subscriptionId: subscription.result.id,
            plan,
        });
        return res.status(200).json({
            message: "Subscription created successfully",
            subscriptionId: subscription.result.id,
            approveUrl: subscription.result.links.find(
                (l) => l.rel === "approve"
            ).href,
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}


export const handleWebhook = async (req, res) => {
    try {
        const event = req.body;

        if (
            event.event_type === "BILLING.SUBSCRIPTION.ACTIVATED" ||
            event.event_type === "BILLING.SUBSCRIPTION.PAYMENT.SUCCEEDED"
        ) {
            const subscriptionId = event.resource.id;
            const planName = event.resource.plan_id;

            const user = await User.findOne({ subscriptionId: { $eq: subscriptionId } });
            if (user) {
                user.plan = planName; // z.B. "iron", "gold", "challenger"
                await user.save();
            }

        }
        return res.sendStatus(200);
    } catch (err) {
        return res.sendStatus(500);
    }
}


export const cancelSubscription = async (req, res) => {
    try {
        const { userId } = req.body;

        const user = await User.findById({ userId: { $eq: userId}});
        if (!user || !user.subscriptionId) {
            return res.status(400).json({ message: "No active subscription" });
        }

        const request = new paypal.subscriptions.SubscriptionsCancelRequest(
            user.subscriptionId
        );
        request.requestBody({
            reason: "User requested cancellation"
        })

        await client.execute(request);

        const subscriptionDetailsRequest =
            new paypal.subscriptions.SubscriptionsGetRequest(user.subscriptionId);
        const subscriptionDetails = await client.execute(subscriptionDetailsRequest);

        const nextBillingTime = subscriptionDetails.result.billing_info.next_billing_time;

        user.cancelAtPeriodEnd = true;
        user.expiryDate = new Date(nextBillingTime);

        await user.save();

        return res.status(200).json({
            message:
                "Subscription cancelled successfully, access remains until next billing date",
            expiryDate: user.expiryDate,
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}