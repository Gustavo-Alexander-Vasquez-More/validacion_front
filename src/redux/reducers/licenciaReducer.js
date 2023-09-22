import { createReducer } from "@reduxjs/toolkit";
import LicenciaActions from "../actions/licenciaAction.js";

const {create_licencia, read_licencia, delete_licencia, update_licencias} = LicenciaActions;
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
.addCase(update_licencias.fulfilled, (state, action)=>{
  return{
  ...state,
  licencias:action.payload
  }
})
})
export default licenciasReducer;
