import { createReducer } from "@reduxjs/toolkit";
import adminActions from "../actions/admins.js";

const {create_admins, login_admins, read_admins, delete_admins, update_admins} = adminActions;
const initialState = {
  admins:[]
};
const adminsReducer = createReducer(initialState, (builder) => {
    builder
.addCase(create_admins.fulfilled, (state, action)=>{
        return{
        ...state,
        admins:action.payload
        }
   })
  .addCase(login_admins.fulfilled, (state, action)=>{
    return{
    ...state,
    admins:action.payload
    }
})
.addCase(read_admins.fulfilled, (state, action)=>{
  return{
  ...state,
  admins:action.payload
  }
})
.addCase(delete_admins.fulfilled, (state, action)=>{
  return{
  ...state,
  admins:action.payload
  }
})
.addCase(update_admins.fulfilled, (state, action)=>{
  return{
  ...state,
  admins:action.payload
  }
})
})
export default adminsReducer;