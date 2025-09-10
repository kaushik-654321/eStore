export const calculateCartTotal = (CartData) =>
    CartData.reduce((total, item) => total + (item.price || item.product.price) * item.quantity, 0)

export const caclulateCartCount = (cartData) =>
    cartData.reduce((total, item) => total + item.quantity, 0);

let timer;

export const debounceCartUpdate = (callback, delay = 1000) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
        callback();
    }, delay);
}



