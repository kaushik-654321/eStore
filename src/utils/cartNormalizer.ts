export const NormalizeCartItem = (cartItems: any, isAuthenticate: boolean) => {
    return cartItems.map((item: any) => {
        console.log(item);
       const product = isAuthenticate? item.product : item;
        return {
            id: product._id,
            name: product.name,
            image: product.image,
            price: product.price,
            quantity: item.quantity,
            total: product.price * item.quantity,
        }
    })
}