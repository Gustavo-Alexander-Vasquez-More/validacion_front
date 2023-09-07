import { configureStore } from "@reduxjs/toolkit";
import estadosReducer from "./reducers/reducer.js";
import adminsReducer from './reducers/adminsReducer.js'

export const store = configureStore({
    reducer: {
        estados:estadosReducer,
        admins:adminsReducer
      },
})