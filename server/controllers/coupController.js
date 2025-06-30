import Coupon from "../models/Coupon.js";

export const getAllCoupon = async (req, res) => {
    try {
        const coupons = await Coupon.find({});
        if (!coupons) return res.status(200).json({ coupons: [] })
        res.status(200).json(coupons);
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to get Coupon', error: error.message })
    }
}

export const getOneCoupon = async (req, res) => {
    const { code } = req.params;
    try {
        const coupon = await Coupon.find({ code });
        if (!coupon) return res.status(200).json({ coupon: [] });
        res.status(200).json(coupon);
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to get Coupon', error: error.message })
    }
}