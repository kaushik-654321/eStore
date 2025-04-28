import Cart from "../models/Cart.js";

export const getCart = async (req, res) => {

    const {userId} = req.params;
    console.log("+++userId", userId);
    const cart = await Cart.findOne({ userId }).populate("items.productId");

    if (!cart) return res.status(200).json({ items: [] });
    res.json(cart);
}

export const addToCart = async (req, res) => {
    const { productId, quantity } = req.body;
    const userId = req.user.id;
    let cart = await cart.findOne({ userId });

    if (!cart) {
        cart = new Cart({ userId, items: [{ productId, quantity }] });
    }
    else {
        const itemIndex = cart.items.findIndex(item => item.productId.equals(productId));
        if (itemIndex > -1) {
            cart.items[itemIndex].quantity += quantity;
        }
        else {
            cart.items.push({ productId, quantity });
        }
    }
    await cart.save();
    res.status(200).json({ message: "cart updated", cart });
}

export const updateCartItem = async (req, res) => {
    const { productId } = req.params;
    const { quantity } = req.body;
    const userId = req.user.id;
    let cart = await cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const item = cart.items.find(item => item.productId.equals(productId));
    if (!item) return res.status(404).json({ message: "Item not in cart" });
    item.quantity = quantity;
    cart.save();
    res.json({ message: "Quantity updated", cart });

}

export const removeCartItem = async(req,res)=>{
    const { productId } = req.params;
    const userId = req.user.id;
    let cart = await cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });
    cart.items = cart.items.filter(item=> !item.productId.equals(productId));
    await cart.save();
    res.json({message:"Item removed", cart})
}