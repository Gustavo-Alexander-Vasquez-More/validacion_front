import { createReducer } from "@reduxjs/toolkit";
import LicenciaActions from "../actions/licenciaAction.js";

const {create_licencia, read_licencia, delete_licencia, update_licencias, read_licenciaAuth, read_Alllicencias} = LicenciaActions;
const initialState = {
  licencias:[],
  AllLicencias:[]
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
.addCase(read_licenciaAuth.fulfilled, (state, action)=>{
  return{
  ...state,
  licencias:action.payload
  }
})
.addCase(read_Alllicencias.fulfilled, (state, action)=>{
  return{
  ...state,
  AllLicencias:action.payload
  }
})
})
export default licenciasReducer;
