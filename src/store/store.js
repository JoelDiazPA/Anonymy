import { configureStore } from "@reduxjs/toolkit";
import { uiSlice } from "./ui/uiSlice";
import { anonymySlice } from "./anonymy/anonymySlice";

export const store = configureStore({
    reducer: {
        anonymy: anonymySlice.reducer,
        ui: uiSlice.reducer
    }
})