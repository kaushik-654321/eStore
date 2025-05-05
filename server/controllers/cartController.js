import Cart from "../models/Cart.js";
import Fruit from "../models/Fruit.js";

export const getCart = async (req, res) => {
  const { userId } = req.params;
  try {
    const cart = await Cart.findOne({ user: userId }).populate("items.product");

    if (!cart) return res.status(200).json({ items: [] });

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch cart", error: error.message });
  }
};

export const addToCart = async (req, res) => {
  const { cartItems, userId } = req.body;

  try {
    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      // Create a new cart
      cart = new Cart({
        user: userId,
        items: [],
      });
    }

    for (const { _id: productId, quantity } of cartItems) {
      const product = await Fruit.findById(productId);
      if (!product) continue; // skip invalid products

      const existingItem = cart.items.find(item => item.product.toString() === productId);

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        cart.items.push({ product: productId, quantity });
      }
    }

    await cart.save();
    const populatedCart = await cart.populate("items.product");
    res.status(200).json(populatedCart);
  } catch (error) {
    res.status(500).json({ message: "Failed to add item to cart", error: error.message });
  }
};

export const updateCartItem = async (req, res) => {
  const { productId, quantity } = req.body;

  try {
    const cart = await Cart.findOne({ user: req.user._id });

    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const item = cart.items.find(item => item.product.toString() === productId);

    if (!item) return res.status(404).json({ message: "Item not found in cart" });

    item.quantity = quantity;
    await cart.save();

    const populatedCart = await cart.populate("items.product");
    res.status(200).json(populatedCart);
  } catch (error) {
    res.status(500).json({ message: "Failed to update cart item", error: error.message });
  }
};

export const removeCartItem = async (req, res) => {
  const { productId } = req.body;

  try {
    const cart = await Cart.findOne({ user: req.user._id });

    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = cart.items.filter(item => item.product.toString() !== productId);
    await cart.save();

    const populatedCart = await cart.populate("items.product");
    res.status(200).json(populatedCart);
  } catch (error) {
    res.status(500).json({ message: "Failed to remove item from cart", error: error.message });
  }
};