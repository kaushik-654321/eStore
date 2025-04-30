import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { cartState, Items } from "../types/item.type";
import { calculateCartTotal } from "../utils/utility";
import axios from "axios";
import { API_ENDPOINTS } from "../api/apiEndpoints";

const initialState: Partial<cartState> = {
    items: [],

}
const token = localStorage.getItem('token');

// Fetch cart from server
export const fetchUserCart = createAsyncThunk(
    'cart/fetchUserCart',
    async (userId: string) => {
        const response = await axios.get(`${API_ENDPOINTS.CART.api}/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data.items as Items[];

    }
)

export const addToCartServer = createAsyncThunk(
    'cart/addToCartServer',
    async (payload: { userId: string, productId: string, quantity: number }) => {
        const token = localStorage.getItem('token');
        const response = await axios.post(`${API_ENDPOINTS.CART.api}/${payload.userId}`, payload,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        return response.data.cart.items as Items[];
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
    }
});
export const { addToCart, removeCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;