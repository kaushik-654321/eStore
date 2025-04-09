import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../features/cartSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";


const cartPersistConfig = {
    key: 'cart',
    storage,
    whitelist: ['items', 'cartTotal']

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