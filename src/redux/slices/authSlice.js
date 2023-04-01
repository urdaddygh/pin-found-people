import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import { removeCookie, setCookie } from "../../utils/cookieFunction/cookieFunction";
import {requests} from "../api";

const initialState = {
    error: false,
};

export const postAuth = createAsyncThunk(
    'auth/postAuth',
    async (data) => {
        localStorage.removeItem('access')
        const res = await requests.authApi(data.values);

        setCookie("refresh", res.data.refresh, 300);
        setCookie("access", res.data.access, 100);
        // console.log("access", res.data);

        data.navigate('/main/profile')
        localStorage.setItem('user_id', res.data.user_id)

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
