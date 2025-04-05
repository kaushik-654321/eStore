import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../features/cartSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import { cartSyncMiddleware } from "../utils/CartSync";

const cartPersistConfig = {
    key: 'cart',
    storage,
    whitelist: ['items']

}

const persistedCartReducer = persistReducer(cartPersistConfig, cartReducer);

console.log(persistedCartReducer);
export const store = configureStore({
    reducer: {
        cart: persistedCartReducer
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});
export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;