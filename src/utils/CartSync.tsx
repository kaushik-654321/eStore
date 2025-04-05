

import { Middleware } from "@reduxjs/toolkit";
import { addToCart, clearCart } from "../features/cartSlice";
//not used now  for tab sync cart order. if user open two diff tab this code sync .
export const cartSyncMiddleware: Middleware<{}> = store => {
    const syncFromStorage = (event: StorageEvent) => {
        if (event.key === 'persist:cart' && event.newValue) {
            try {
                const persisted = JSON.parse(event.newValue);
                const newItems = JSON.parse(persisted.items || []);
                const currentItems = store.getState().cart.items;
                const isSame = JSON.stringify(currentItems) === JSON.stringify(newItems);
                if (!isSame) {
                    store.dispatch(clearCart());
                    newItems.forEach((item: any) => {
                        // store.dispatch(addToCart(item));
                        console.log(item);
                        store.dispatch(addToCart({ _id: item._id, name: item.name, price: item.price, image: item.image, quantity:item.quantity }))
                    });
                }
            }
            catch (err) {
                console.error('[Cart Sync] Error parsing storage:', err);
            }
        }
    }
    if (typeof window !== 'undefined') {
        window.addEventListener('storage', syncFromStorage);
    }
    return next => action => next(action)
}