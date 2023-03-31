import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { requests } from "../api";


const initialState = {
    users: [],
    error:{}
  };
  
export const getUsers = createAsyncThunk(
    "users/getUsers",
    async function(_,{ rejectWithValue}){
      try {
        const res = await requests.getUsers();
        console.log(res)
        if (!res) {
          throw new Error("ERROR");
        }
        return res.data
      } catch (error) {
          return rejectWithValue(error.message)
      }
    }
  );



  const userSlice = createSlice({
    name: "user",
    initialState,
    status: null,
    error: null,
    // reducers: {
    //   getUser: (state, action) => {
    //     state.event = action.payload;
    //   },
    // },
    extraReducers: {
      [getUsers.pending]: (state) => {
        state.status = "loading";
        state.error = null;
      },
      [getUsers.fulfilled]: (state, action) => {
        state.status = "resolved";
        state.users = action.payload;
        // console.log("fullfiled");
      },
      [getUsers.rejected]: (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
      },
    },
});
  
  export const userSlices = userSlice.reducer;