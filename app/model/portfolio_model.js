import mongoose from "mongoose";

const portfolioSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true
    },
    codelink: {
        type: String,
        required: true
    },
    livelink: {
        type: String,
        required: true
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    }
}, { timestamps: true , versionKey: false });

const PortfolioModel = mongoose.model("portfolios", portfolioSchema);
export default PortfolioModel;