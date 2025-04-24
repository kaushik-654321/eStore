import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import {getCart, addToCart, updateCartItem, removeCartItem} from '../controllers/cartController.js';




const cartRoutes = express.Router();

cartRoutes.get("/", protect, getCart);
cartRoutes.post("/", protect, addToCart);
cartRoutes.put("/:productId", protect, updateCartItem);
cartRoutes.delete("/:productId", protect, removeCartItem);

export default cartRoutes;