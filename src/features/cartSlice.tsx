import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface cartItem {
    id: string;
    name: string;
    price: number;
    image: string;
    quantity: number;
    total?: number;
}

interface cartState {
    items: cartItem[]
}

const initialState: cartState = {
    items: []
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<cartItem>) => {
            const existingItem = state.items.find(item => item.id === action.payload.id);

            if (existingItem) {

                existingItem.quantity += 1;
                existingItem.price *= existingItem.quantity;
            }
            else {
                state.items.push({ ...action.payload, quantity: 1, total:action.payload.price })

            }
        },
        removeCart: (state, action: PayloadAction<string>) => {
            state.items = state.items.filter(item => item.id !== action.payload);
        },
        updateQuantity: (state, action: PayloadAction<{ id: string; quantity: number }>) => {
            const item = state.items.find(item => item.id === action.payload.id);
            if (item && action.payload.quantity > 0) {
                item.quantity = action.payload.quantity;
            }
        },
        clearCart: (state) => {
            state.items = [];
        }
    }
});
export const { addToCart, removeCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;