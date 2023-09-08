import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const create_licencia = createAsyncThunk(
'create_licencia', 
async(datos)=>{
try {
const {data}=await axios.post('http://localhost:8084/api/clientes/create', datos)
console.log(data.response);
return data.response
} catch (error) {
    console.log(error);
}
} 
)
const read_licencia = createAsyncThunk(
    'read_licencia', 
    async()=>{
    try {
    const {data}=await axios.get('http://localhost:8084/api/clientes')
    console.log(data.response);
    return data.response
    } catch (error) {
        console.log(error);
    }
    } 
    )
const licenciaActions ={create_licencia, read_licencia}
export default licenciaActions