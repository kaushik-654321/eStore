import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface userState {
    name: string;
    email: string;
    isAuthenticated: boolean;
    userId: string;
    token: string;
}

const userSession = sessionStorage.getItem('user');
const initialState: userState = userSession ? JSON.parse(userSession) : {
    name: null,
    email: null,
    isAuthenticated: false,
    userId: null,
    token: null
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<{ name: string, email: string, userId: string, token: string }>) => {
            state.name = action.payload.name;
            state.email = action.payload.email;
            state.userId = action.payload.userId;
            state.isAuthenticated = true;
            state.token = action.payload.token;
            sessionStorage.setItem('user', JSON.stringify(state));
        },
        clearUser: (state) => {
            state.name = "";
            state.email = "";
            state.isAuthenticated = false;
            state.userId = "";
            state.token = "";
            sessionStorage.removeItem('token');
        }
    }
})

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;