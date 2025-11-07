import Home from "../components/home/Home";
import Features from "../components/features/Features";
import Stats from "../components/stats/Stats";
import Footer from "../components/footer/Footer";
import Faq from "../components/faq/Faq";
import Reviews from "../constants/reviews/Reviews";

export default function Main() {
    return (
        <>
            <Home />
            <Features />
            <Stats />
            <Reviews />
            <Faq />
            <Footer />
        </>
    );
}
