import mongoose from 'mongoose';

const couponSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    code: {
        type: String,
        required: true,
        unique: true
    },
    discount: {
        type: Number,
        required: true
    },
    expiresOn: {
        type: Date,
        required: true,
    }
}, {
    timestamps: true
})

const Coupon = mongoose.model('coupons', couponSchema);

export default Coupon;