import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const create_admins = createAsyncThunk(
    'create_admins', 
    async(datos)=>{
        try {
        const {data}=await axios.post('http://localhost:8084/api/admins/create', datos)
        console.log(data.response);
        return data.response
        } catch (error) {
        }
    } 
    )
    const login_admins = createAsyncThunk(
        'login_admins', 
        async(datos)=>{
            try {
            const {data}=await axios.post('http://localhost:8084/api/admins/login', datos)
            let token = data.response.token;
      localStorage.setItem('token', token);
      localStorage.setItem('usuario', data.response.usuario); 
    localStorage.setItem('rol', data.response.rol )
      console.log(data.response);
    return data.response;
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Usuario no registrado',

      })
      return null;
    }
  }
)
const read_admins = createAsyncThunk(
    'read_admins', 
    async()=>{
        try {
        const {data}=await axios.get('http://localhost:8084/api/admins')
        console.log(data.response);
        return data.response
        } catch (error) {
        }
    } 
)
const delete_admins = createAsyncThunk(
    'delete_admins', 
    async(datos)=>{
        try {
        const {data}=await axios.delete('http://localhost:8084/api/admins/delete', datos)
        console.log(data.response);
        return data.response
        } catch (error) {
        }
    } 
    )

    const adminActions = { create_admins, login_admins, read_admins, delete_admins}
    export default adminActions