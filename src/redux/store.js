import { configureStore } from "@reduxjs/toolkit";
import estadosReducer from "./reducers/reducer.js";


export const store = configureStore({
    reducer: {
        estados:estadosReducer
      },
})