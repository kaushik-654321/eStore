import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import {getCart, addToCart, updateCartItem, removeCartItem} from '../controllers/cartController.js';




const cartRoutes = express.Router();

cartRoutes.get("/:userId", protect, getCart);
cartRoutes.post("/:userId", protect, addToCart);
cartRoutes.put("/:userId", protect, updateCartItem);
cartRoutes.delete("/:userId/:productId", protect, removeCartItem);

export default cartRoutes;