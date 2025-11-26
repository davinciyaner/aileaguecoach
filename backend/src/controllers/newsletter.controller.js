import Newsletter from "../models/newsletter.model.js";


export const subscribeNewsletter = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ message: "Please enter your email address." });
        }

        const existingEmail = await Newsletter.findOne({ $eq: email });
        if (existingEmail) {
            return res.status(400).json({ message: "You already subscribed to our newsletter. Thank you." });
        }

        await Newsletter.create({ $eq: email });

        // Sofort Antwort zurück
        res.status(200).json({ message: "Successfully subscribed to our newsletter. Thank you." });

    } catch (error) {
        res.status(500).json({ message: "Something went wrong. Please try again." });
    }
};


export const unsubscribeNewsletter = async (req, res) => {
    try {
        const { email } = req.query;

        if (!email) {
            return res.status(400).json({ message: "Please enter your email address." });
        }

        const existing = await Newsletter.findOne({ email: { $eq: email }});
        if (!existing) {
            return res
                .status(404)
                .json({ message: "This email doesn't exists in our newsletter." });
        }

        await Newsletter.deleteOne({ emai: { $eq: email }});

        res.status(200).json({ message: "Successfully unsubscribed." });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong. Please try again or contact the support.." });
    }
};