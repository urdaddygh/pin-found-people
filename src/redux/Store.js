import { configureStore } from "@reduxjs/toolkit";
import { authSlices } from "./slices/authSlice";
import { userSlices } from "./slices/getUsers";


export const store = configureStore({
  reducer: {
    auth: authSlices,
    users:userSlices,
  },
});
