import { configureStore } from "@reduxjs/toolkit";
import estadosReducer from "./reducers/reducer.js";
import adminsReducer from './reducers/adminsReducer.js'
import licenciasReducer from "./reducers/licenciaReducer.js";
export const store = configureStore({
reducer: {
    estados:estadosReducer,
    admins:adminsReducer,
    licencias:licenciasReducer
},
})