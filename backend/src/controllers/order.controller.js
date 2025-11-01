import paypal from "@paypal/checkout-server-sdk";
import Order from "../models/order.model.js";
import User from "../models/auth.model.js";


import dotenv from "dotenv";
dotenv.config();

const environment = new paypal.core.SandboxEnvironment(
    process.env.PAYPAL_CLIENT_ID,
    process.env.PAYPAL_CLIENT_SECRET
)

const client = new paypal.core.PayPalHttpClient(environment);

export const createOrder = async (req, res) => {
    try {
        const { userId, items } = req.body;

        const totalAmount = items.reduce((sum, item) => sum + item.price, 0);

        const request = new paypal.orders.OrdersCreateRequest();
        request.prefer("return=representation");
        request.requestBody({
            intent: "CAPTURE",
            purchase_units: [
                {
                    amount: {
                        // evtl. auf usd ändern
                        currency_code: "EUR",
                        value: totalAmount.toFixed(2),
                    }
                }
            ],
            application_context: {
                brand_name: "AI League Coach",
                landing_page: "LOGIN",
                user_action: "PAY_NOW",
                return_url: "http://localhost:3000/checkout/success",  // Redirect nach Erfolg
                cancel_url: "http://localhost:3000/checkout/cancel"   // Redirect bei Abbruch
            }
        });
        const order = await client.execute(request);

        const user = await User.findById(userId);
        if (!user) return res.status(400).json({ message: "User not found" });

        const newOrder = new Order({
            user: user._id,
            items,
            totalAmount,
            paypalOrderId: order.result.id,
        });

        await newOrder.save();

        return res.status(200).json({
            message: 'Order successfully created',
            paypalOrderId: order.result.id,
            approveUrl: order.result.links.find((link) => link.rel === "approve").href
        });

    } catch (error) {
        console.log('Order failed', error);
        return res.status(500).json({message: error.message});
    }
}

export const captureOrder = async (req, res) => {
    try {
        const { orderId } = req.body;

        const request = new paypal.orders.OrdersCaptureRequest(orderId);
        request.requestBody({});
        const capture = await client.execute(request);

        const order = await Order.findOneAndUpdate(
            { paypalOrderId: orderId },
            { paymentStatus: "paid" },
            { new: true }
        );

        if (!order) return res.status(404).json({ message: "Order not found" });

        const planType = order.items[0].items?.name || null;

        const user = await User.findById(order.user);
        if (user && planType) {
            user.plan = planType;
            await user.save();
        }

        return res.status(200).json({ message: "Payment successfully created", capture: capture.result, order, user });
    } catch (error) {
        console.log('Order failed', error);
        return res.status(500).json({message: error.message});
    }
}