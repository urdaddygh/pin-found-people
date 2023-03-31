import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import { removeCookie, setCookie } from "../../utils/cookieFunction/cookieFunction";
import {requests} from "../api";

const initialState = {
    error: false,
};

export const postAuth = createAsyncThunk(
    'auth/postAuth',
    async (data) => {
        console.log("second", data)
        const res = await requests.authApi(data.values);
        console.log("auth", res.data);
        debugger
        setCookie("refresh", JSON.stringify(res.data.refresh), 1);
        setCookie("access", JSON.stringify(res.data.access), 0.3);
        data.navigate('/main/profile')
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
