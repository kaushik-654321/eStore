export const calculateCartTotal = (CartData) =>
    CartData.reduce((total, item) => total + item.price * item.quantity, 0)

