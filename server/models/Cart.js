import mongoose from 'mongoose';


const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    items: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "fruits",
                required: true
            },
            quantity: {
                type: Number,
                required: true
            },
        }
    ]
},
    {
        timeStamp: true
    })

const Cart = mongoose.model('cart', cartSchema);
export default Cart;