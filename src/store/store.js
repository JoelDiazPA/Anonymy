import { configureStore } from "@reduxjs/toolkit";
import { uiSlice } from "./ui/uiSlice";
import { anonymySlice } from "./anonymy/anonymySlice";
import { authSlice } from "./auth/authSlice";

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        anonymy: anonymySlice.reducer,
        ui: uiSlice.reducer
    }
})