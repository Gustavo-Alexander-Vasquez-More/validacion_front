import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const create_admins = createAsyncThunk(
    'create_admins', 
    async(datos)=>{
        try {
        const {data}=await axios.post('http://localhost:8084/api/admins/create', datos)
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
    localStorage.setItem('folios', data.response.folios)
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
        return data.response
        } catch (error) {
        }
    } 
)
const delete_admins = createAsyncThunk(
  'delete_admins',
  async (datitos) => {
    try {
      const { data } = await axios.delete('http://localhost:8084/api/admins/delete', {
        data: datitos, 
      });
    return data.response;
    } catch (error) {
      return null;
    }
  }
)
const update_admins = createAsyncThunk(
  'update_admins', 
  async (payload) => {
    const { usuario, folios } = payload;
    console.log(usuario);
    console.log(folios);
      try {
      const {data}=await axios.put(`http://localhost:8084/api/admins/update/${usuario}`,{
        folios:folios})
      return data.response
      } catch (error) {
      }
  } 
)

    const adminActions = { create_admins, login_admins, read_admins, delete_admins, update_admins}
    export default adminActions