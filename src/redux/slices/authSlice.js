import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {requests} from "../api";

const initialState = {
    error: false,
};

export const postAuth = createAsyncThunk(
    'auth/postAuth',
    async (data) => {
        const res = await requests.authApi(data.authData);
        console.log("first", res.data);
        // setCookie("user_info", JSON.stringify(res.data), 100);
        // setCookie("access", JSON.stringify(res.data.access), 100);
        // localStorage.setItem('userId', res.data.user_id)
        // localStorage.setItem("token", res.data.access)
        return res.data;
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    extraReducers: {
        [postAuth.pending]: (state) => {
            state.error = false;
        },
        [postAuth.fulfilled]: (state, action) => {
            state.error = false;
        },
        [postAuth.rejected]: (state) => {
            state.error = true;
        },
    },
});

export const authSlices = authSlice.reducer;
