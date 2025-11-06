import Reviews from '../models/reviews.model.js'

// Neue Review erstellen
export const createReview = async (req, res) => {
    try {
        const { name, rating, comment } = req.body;
        if (!rating || !comment) {
            return res.status(400).json({ message: "Sterne und Kommentar sind erforderlich." });
        }

        const review = new Reviews({ name, rating, comment });
        await review.save();

        res.status(201).json({ message: "Bewertung erfolgreich abgegeben, danke.", review });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error." });
    }
};

// Alle Reviews abrufen
export const getReviews = async (req, res) => {
    try {
        const reviews = await Reviews.find().sort({ createdAt: -1 });
        res.status(200).json(reviews);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error." });
    }
};

// Stern-Verteilung berechnen
export const getStats = async (req, res) => {
    try {
        const reviews = await Reviews.find();
        const total = reviews.length;

        // Stats immer zurückgeben, selbst wenn keine Reviews existieren
        const stats = [5, 4, 3, 2, 1].map((star) => ({
            stars: star,
            percent: total ? Math.round((reviews.filter(r => r.rating === star).length / total) * 100) : 0,
        }));

        res.status(200).json({ total, stats, reviews });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error." });
    }
};
