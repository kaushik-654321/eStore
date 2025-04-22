import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface userState {
    name: string;
    email: string;
    isAuthenticated: boolean;
}

const initialState: userState = {
    name: "",
    email: "",
    isAuthenticated: false
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<{ name: string, email: string }>) => {
            state.name = action.payload.name;
            state.email = action.payload.email;
            state.isAuthenticated = true;
        },
        clearUser: (state) => {
            state.name = "";
            state.email = "";
            state.isAuthenticated = false;
        }
    }
})

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;