import { createReducer } from "@reduxjs/toolkit";
import estadosActions from "../actions/estados.js";

const {read_estados } = estadosActions;
const initialState = {
  estados:[]
};
const estadosReducer = createReducer(initialState, (builder) => {
    builder
.addCase(read_estados.fulfilled, (state, action)=>{
        return{
        ...state,
        estados:action.payload
        }
   })
})


export default estadosReducer;