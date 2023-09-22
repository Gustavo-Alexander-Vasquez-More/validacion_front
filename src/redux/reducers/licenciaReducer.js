import { createReducer } from "@reduxjs/toolkit";
import LicenciaActions from "../actions/licenciaAction.js";

const {create_licencia, read_licencia, delete_licencia} = LicenciaActions;
const initialState = {
  licencias:[]
};

const licenciasReducer = createReducer(initialState, (builder) => {
    builder
.addCase(create_licencia.fulfilled, (state, action)=>{
        return{
        ...state,
        licencias:action.payload
        }
})
.addCase(read_licencia.fulfilled, (state, action)=>{
  return{
  ...state,
  licencias:action.payload
  }
})
.addCase(delete_licencia.fulfilled, (state, action)=>{
  return{
  ...state,
  licencias:action.payload
  }
})
})
export default licenciasReducer;
