import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { Items } from "../types/item.type";




interface cartState {
    items: Items[];
    isLoggedIn: false;
}

const initialState: Partial<cartState> = {
    items: []
}
// Thunks for server sync
// export const fetchUserCart = createAsyncThunk(
//     'cart/fetchUserCart',
//     async(userId : string)=>{
//         const res = a

//     }
// )

// export const syncCartToServer = createAsyncThunk(
//     'cart/syncCartToServer',
//     async(payload:{userId: string; items: cartItem[]} ){

//     }
// )

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<Items>) => {
           
            const existingItem: Items = state.items.find(item => item._id === action.payload._id);
           
            if (existingItem) {
                console.log(action.payload);
                existingItem.quantity += 1;
                console.log(existingItem.quantity);
                existingItem.price *= existingItem.quantity;
            }
            else {
                state.items.push({ ...action.payload, quantity: 1, total: action.payload.price })

            }
        },
        removeCart: (state, action: PayloadAction<string>) => {
            state.items = state.items.filter(item => item._id !== action.payload);
        },
        updateQuantity: (state, action: PayloadAction<{ _id: string; quantity: number }>) => {
            const item = state.items.find(item => item._id === action.payload._id);
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