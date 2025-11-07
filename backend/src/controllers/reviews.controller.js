import Reviews from '../models/reviews.model.js'


export const createReview = async (req, res) => {
    try {
        const { name, rating, comment } = req.body;
        if (!rating || !comment) {
            return res.status(400).json({ message: "Bitte wähle die Anzahl der Sterne aus und schreibe ein Kommentar." });
        }

        const review = new Reviews({ name, rating, comment });
        await review.save();

        res.status(201).json({ message: "Bewertung erfolgreich abgegeben. Vielen Dank für deine Bewertung.", review });
    } catch (error) {
        res.status(500).json({ message: "Server error." });
    }
};


export const getReviews = async (req, res) => {
    try {
        const reviews = await Reviews.find().sort({ createdAt: -1 });
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ message: "Server error." });
    }
};


export const getStats = async (req, res) => {
    try {
        const reviews = await Reviews.find();
        const total = reviews.length;

        const stats = [5, 4, 3, 2, 1].map((star) => ({
            stars: star,
            percent: total ? Math.round((reviews.filter(r => r.rating === star).length / total) * 100) : 0,
        }));

        res.status(200).json({ total, stats, reviews });
    } catch (error) {
        res.status(500).json({ message: "Server error." });
    }
};
