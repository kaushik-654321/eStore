import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface userState {
    name: string;
    email: string;
    isAuthenticated: boolean;
    userId: string;
}

const initialState: userState = {
    name: "",
    email: "",
    isAuthenticated: false,
    userId: "",
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<{ name: string, email: string, userId: string }>) => {
            state.name = action.payload.name;
            state.email = action.payload.email;
            state.userId = action.payload.userId;
            state.isAuthenticated = true;
        },
        clearUser: (state) => {
            state.name = "";
            state.email = "";
            state.isAuthenticated = false;
            state.userId = "";
        }
    }
})

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;