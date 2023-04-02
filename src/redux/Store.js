import { configureStore } from "@reduxjs/toolkit";
import { authSlices } from "./slices/authSlice";
import { userSlices } from "./slices/getUsers";
import { sitizenSlices } from "./slices/citizenInfo";


export const store = configureStore({
  reducer: {
    auth: authSlices,
    users: userSlices,
    sitizen: sitizenSlices,
  },
});
