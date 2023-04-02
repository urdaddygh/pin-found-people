import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { requests } from "../api";

const initialState = {
  error: false,
  adress: {},
  family: [],
};

export const postGetAdress = createAsyncThunk(
  "citizen/postGetAdress",
  async (data) => {
    const res = await requests.postGetAdress(data);
    // console.log("adress", res.data);
    return res.data;
  }
);

export const postGetFamily = createAsyncThunk(
  "citizen/postGetFamily",
  async (data) => {
    const res = await requests.postGetFamily(data);
    console.log("family", res.data);
    return res.data.members;
  }
);

const sitizenSlice = createSlice({
  name: "citizen",
  initialState,
  extraReducers: {
    [postGetAdress.pending]: (state) => {
        state.error = false;
    },
    [postGetAdress.fulfilled]: (state, action) => {
      state.error = false;
      state.adress = action.payload
    },
    [postGetAdress.rejected]: (state) => {
        state.error = true;
    },


    [postGetFamily.pending]: (state) => {
        state.error = false;
    },
    [postGetFamily.fulfilled]: (state, action) => {
      state.error = false;
      state.family = action.payload
    },
    [postGetFamily.rejected]: (state) => {
        state.error = true;
    },
  },
});

export const sitizenSlices = sitizenSlice.reducer;
