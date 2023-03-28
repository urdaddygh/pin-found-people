import { configureStore } from "@reduxjs/toolkit";
import { authSlices } from "./slices/authSlice";

export const store = configureStore({
  reducer: {
    auth: authSlices,
  },
});
