import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { cartState, Items } from "../types/item.type";
import { calculateCartTotal } from "../utils/utility";






const initialState: Partial<cartState> = {
    items: [],
    
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
                existingItem.quantity += 1;
                existingItem.total = existingItem.price * existingItem.quantity;
            }
            else {
                state.items.push({ ...action.payload, quantity: 1, total: action.payload.price })

            }
            state.cartTotal = calculateCartTotal(state.items);
            console.log(calculateCartTotal(state.items));
        },
        removeCart: (state, action: PayloadAction<{ _id: string }>) => {
            state.items = state.items.filter(item => item._id !== action.payload._id);
            state.cartTotal = calculateCartTotal(state.items);
           
        },
        updateQuantity: (state, action: PayloadAction<{ _id: string; quantity: number }>) => {
            const item = state.items.find(item => item._id === action.payload._id);
            if (item && action.payload.quantity > 0) {
                item.quantity = action.payload.quantity;
                item.total = item.price * item.quantity;
            }
            if(item && action.payload.quantity <1){
                state.items = state.items.filter(item => item._id !== action.payload._id);
            }
            state.cartTotal = calculateCartTotal(state.items);
        },
        clearCart: (state) => {
            state.items = [];
        }
    }
});
export const { addToCart, removeCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;