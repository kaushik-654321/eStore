import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { cartState, Items, fetchUserCartPayload, addToCartPayload } from "../types/item.type";
import { calculateCartTotal } from "../utils/utility";
import axios from "axios";
import { API_ENDPOINTS } from "../api/apiEndpoints";

const initialState: Partial<cartState> = {
    items: [],

}




// Fetch cart from server
export const fetchUserCart = createAsyncThunk<Items[], fetchUserCartPayload>(
    'cart/fetchUserCart',
    async ({ userId, token }) => {
        const response = await axios.get(`${API_ENDPOINTS.CART.api}/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data.items as Items[];
    }
)

export const addToCartServer = createAsyncThunk<Items[], Partial<addToCartPayload>>(
    'cart/addToCartServer',
    async ({ userId, token, cartItems }) => {
        const response = await axios.post(`${API_ENDPOINTS.CART.api}/${userId}`, { userId, cartItems },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        return response.data.items as Items[];
    }
)

export const updateCartServer = createAsyncThunk<Items[], Partial<addToCartPayload>>(
    'cart/updateCartServer',
    async ({ userId, token, cartItems }) => {
       
        const response = await axios.put(`${API_ENDPOINTS.CART.api}/${userId}/${cartItems[0]._id}`, { userId, cartItems },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        return response.data.items as Items[];
    }
)


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
            if (item && action.payload.quantity < 1) {
                state.items = state.items.filter(item => item._id !== action.payload._id);
            }
            state.cartTotal = calculateCartTotal(state.items);
        },
        clearCart: (state) => {
            state.items = [];
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUserCart.fulfilled, (state, action) => {
            state.items = action.payload;
            state.cartTotal = calculateCartTotal(state.items);
        })
        builder.addCase(addToCartServer.fulfilled, (state, action) => {
            state.items = action.payload;
            state.cartTotal = calculateCartTotal(state.items);
        })
        builder.addCase(updateCartServer.fulfilled, (state, action)=>{
            state.items = action.payload;
            state.cartTotal = calculateCartTotal(state.items);
        })
    }
});
export const { addToCart, removeCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;