import cors from "cors";
import express from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import mongoose from "mongoose";
import { DATABASE, MAX_JSON_SIZE, PORT, REQUEST_LIMIT, REQUEST_TIME, URL_ENCODE, WEB_CACHE } from "./app/config/config.js";
import router from "./routes/api.js";

const app = express();

app.use(cors());
app.use(express.json({ limit: MAX_JSON_SIZE }));
app.use(express.urlencoded({ extended: URL_ENCODE }));
app.use(helmet());

const limiter = rateLimit({
    windowMs: REQUEST_TIME,
    max: REQUEST_LIMIT
});
app.use(limiter);

app.set("etag", WEB_CACHE);

app.use("/api", router);

const connectDB = async () => {
    try {
        await mongoose.connect(DATABASE, {
            autoIndex: true,
        });
        console.log("MongoDB Connected...");
    } catch (error) {
        console.error("MongoDB connection failed:", error);
        process.exit(1);
    }
};

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});