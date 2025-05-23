import { Items } from "../types/item.type";

export const NormalizeCartItem = (cartItems: Items[]) => {
    console.log(cartItems)
    return cartItems?.map((item: Partial<Items>) => {
        // console.log(item);
       const product = item?.product || item;
        return {
            _id: product._id,
            name: product.name,
            image: product.image,
            price: product.price,
            quantity: item.quantity,
            total: product.price * item.quantity,
        }
    })
}