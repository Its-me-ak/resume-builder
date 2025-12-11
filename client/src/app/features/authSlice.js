import { createSlice } from "@reduxjs/toolkit";


const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        token: null,
        loading: false,
    },
    reducers: {
        login: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        logout: (state) => {
            state.token = "";
            state.user = null;
            localStorage.removeItem("token");
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
    }
})

export const { login, logout, setLoading } = authSlice.actions;
export default authSlice.reducer;