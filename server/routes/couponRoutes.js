import express from 'express';

import { getAllCoupon , getOneCoupon} from "../controllers/coupController.js";

const couponRoutes = express.Router();

couponRoutes.get("/", getAllCoupon);
couponRoutes.get("/:code", getOneCoupon);

export default couponRoutes;