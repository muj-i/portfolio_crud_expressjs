import PortfolioModel from "../model/portfolio_model.js";

export const createPortfolio = async (req, res) => {
  try {
    const userId = req.headers.user.userId;
    req.body.userId = userId;
    if (!req.body.title) {
      return res.status(400).json({ message: "Portfolio title is required" });
    }
    if (!req.body.description) {
      return res.status(400).json({ message: "Portfolio description is required" });
    }
    if (!req.body.img) {
      return res.status(400).json({ message: "Portfolio img is required" });
    }
    if (!req.body.codelink) {
      return res.status(400).json({ message: "Portfolio codeLink is required" });
    }
    if (!req.body.livelink) {
      return res.status(400).json({ message: "Portfolio liveLink is required" });
    }

    const portfolio = await PortfolioModel.create(req.body);
    return res.status(201).json({ message: "Portfolio created successfully", portfolio });
  } catch (error) {
    console.error(error);
    return res
      .status(400)
      .json({ message: "Portfolio creation failed", error: error.message });
  }
};

export const updatePortfolio = async (req, res) => {
  try {
    const userId = req.headers.user.userId;
    const portfolioId = req.params.id;

    console.log(userId, portfolioId);
    if (!portfolioId) {
      return res.status(400).json({ message: "Portfolio ID is required" });
    }
    const portfolio = await PortfolioModel.findOne({ _id: portfolioId, userId });
    console.log(portfolio);
    if (!portfolio) {
      return res.status(400).json({ message: "Portfolio not found" });
    }

    const updatedPortfolio = await PortfolioModel.findOneAndUpdate(
      { _id: portfolioId, userId },
      req.body,
      { new: true }
    );
    return res
      .status(200)
      .json({ message: "Portfolio updated successfully", updatedPortfolio });
  } catch (error) {
    console.error(error);
    return res
      .status(400)
      .json({ message: "Portfolio update failed", error: error.message });
  }
};

export const deletePortfolio = async (req, res) => {
  try {
    const userId = req.headers.user.userId;
    const portfolioId = req.params.id;

    console.log(userId, portfolioId);

    if (!portfolioId) {
      return res.status(400).json({ message: "Portfolio ID is required" });
    }

    const portfolio = await PortfolioModel.findOne({ _id: portfolioId, userId });
    if (!portfolio) {
      return res.status(404).json({ message: "Portfolio not found" });
    }

    await PortfolioModel.deleteOne({ _id: portfolioId, userId });
    return res.status(200).json({ message: "Portfolio deleted successfully" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Portfolio deletion failed", error: error.message });
  }
};

export const getAllPortfolio = async (req, res) => {
  try {
    const userId = req.headers.user.userId;
    const allPortfolio = await PortfolioModel.find({ userId });
    return res
      .status(200)
      .json({ message: "All portfolio listed successfully", allPortfolio });
  } catch (error) {
    console.error(error);
    return res
      .status(400)
      .json({ message: "Error listing all portfolio", error: error.message });
  }
};




