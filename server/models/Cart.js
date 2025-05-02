import mongoose from 'mongoose';



const cartItemSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Fruit",
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
        default: 1,
        min: 1
    },
})

const cartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
        unique: true

    },
    items: [cartItemSchema]
},
    {
        timeStamp: true
    })

const Cart = mongoose.model('cart', cartSchema);
export default Cart;