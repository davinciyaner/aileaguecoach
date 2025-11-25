import rateLimit from "express-rate-limit";


const globalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
    message: "Too many requests from this IP, please try again later."
});

// Optional: stricter limiter for downloads
const downloadLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10,
    message: "Too many downloads from this IP, please wait a while."
});

export { globalLimiter, downloadLimiter };