import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { cartState, Items, fetchUserCartPayload, addToCartPayload } from "../types/item.type";
import { caclulateCartCount, calculateCartTotal } from "../utils/utility";
import axios from "axios";
import { API_ENDPOINTS } from "../api/apiEndpoints";
import axiosInstance from "../api/axiosInstance";

const initialState: Partial<cartState> = {
    items: [],

}




// Fetch cart from server
export const fetchUserCart = createAsyncThunk<Items[], fetchUserCartPayload>(
    'cart/fetchUserCart',
    async ({ userId, token }) => {
        const response = await axiosInstance.get(`${API_ENDPOINTS.CART.api}/${userId}`);
        return response.data.items as Items[];
    }
)

export const addToCartServer = createAsyncThunk<Items[], Partial<addToCartPayload>>(
    'cart/addToCartServer',
    async ({ userId, cartItems }) => {
        const response = await axiosInstance.post(`${API_ENDPOINTS.CART.api}/${userId}`,
            { userId, cartItems });
        return response.data.items as Items[];
    }
)

export const updateCartServer = createAsyncThunk<Items[], Partial<addToCartPayload>>(
    'cart/updateCartServer',
    async ({ userId, cartItems }) => {

        const response = await axiosInstance.put(`${API_ENDPOINTS.CART.api}/${userId}/${cartItems[0]._id}`,
            { userId, cartItems },
        );
        if (!response.data || !response.data.items) {
            return [];
        }
        return response.data.items as Items[];
    }
)

export const removeCartServer = createAsyncThunk<Items[], Partial<addToCartPayload>>(
    'cart/removeCartServer',
    async ({ userId, cartItems }) => {
        const productId = cartItems?.[0]?._id;

        if (!userId || !productId) {
            throw new Error("Invalid input for removeCartServer");
        }
        const response = await axiosInstance.delete(`${API_ENDPOINTS.CART.api}/${userId}/${productId}`);
        if (!response.data || !response.data.items) {
            return [];
        }
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
            state.cartCount = caclulateCartCount(state.items);
            

        },
        removeCart: (state, action: PayloadAction<{ _id: string }>) => {
            state.items = state.items.filter(item => item._id !== action.payload._id);
            state.cartTotal = calculateCartTotal(state.items);
            state.cartCount = caclulateCartCount(state.items);
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
            state.cartCount = caclulateCartCount(state.items);
        },
        clearCart: (state) => {
            state.items = [];
            state.cartTotal = null;
            state.cartCount = null;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUserCart.fulfilled, (state, action) => {
            state.items = action.payload;
            state.cartTotal = calculateCartTotal(state.items);
            state.cartCount = caclulateCartCount(state.items);
        })
        builder.addCase(addToCartServer.fulfilled, (state, action) => {
            state.items = action.payload;
            state.cartTotal = calculateCartTotal(state.items);
            state.cartCount = caclulateCartCount(state.items);
        })
        builder.addCase(updateCartServer.fulfilled, (state, action) => {
            state.items = action.payload;
            state.cartTotal = calculateCartTotal(state.items);
            state.cartCount = caclulateCartCount(state.items);
        })
        builder.addCase(removeCartServer.fulfilled, (state, action) => {
            state.items = action.payload;
            state.cartTotal = calculateCartTotal(state.items);
            state.cartCount = caclulateCartCount(state.items);
        })
    }
});
export const { addToCart, removeCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;