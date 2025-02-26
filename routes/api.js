import express from "express";
import * as PortfolioController from "../app/controller/portfolio_controller.js";
import * as UserController from "../app/controller/users_controller.js";
import AuthMiddleware from "../app/middlewares/auth_middleware.js";

const router = express.Router();

// user auth
router.post('/register', UserController.register);
router.post('/login', UserController.login);

// user profile
router.get('/profile', AuthMiddleware, UserController.profile);
router.put('/update-profile', AuthMiddleware, UserController.updateProfile);

// portfolio
router.get('/get-all-portfolio', AuthMiddleware, PortfolioController.getAllPortfolio);
router.post('/create-portfolio', AuthMiddleware, PortfolioController.createPortfolio);
router.put('/update-portfolio/:id', AuthMiddleware, PortfolioController.updatePortfolio);
router.delete('/delete-portfolio/:id', AuthMiddleware, PortfolioController.deletePortfolio);


export default router;
