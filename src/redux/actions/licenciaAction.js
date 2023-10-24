import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Swal from "sweetalert2";


const create_licencia = createAsyncThunk(
'create_licencia', 
async(datos)=>{
try {
const {data}=await axios.post('https://validacionback-production.up.railway.app/api/clientes/create', datos)
Swal.fire({
    position: 'center',
    icon: 'success',
    title: 'Licencia creada!',
    showConfirmButton: false,
    timer: 1500,
});
return data.response
} catch (error) {
    Swal.fire({
        icon: 'error',
        title: 'No se ha creado el Alta',
        text: 'Este folio ya existe intenta con otro!',
        
      })
}
} 
)
const read_licencia = createAsyncThunk(
    'read_licencia', 
    async(page)=>{
    try {
    const {data}=await axios.get(`https://validacionback-production.up.railway.app/api/clientes?page=${page}`)
   console.log(data);
    
    return data
    } catch (error) {
        console.log(error);
    }
    } 
    )
    const delete_licencia = createAsyncThunk(
        'delete_licencia', 
        async(dato)=>{
        try {
        const {data}=await axios.delete('https://validacionback-production.up.railway.app/api/clientes/delete', {
            data:dato
        })
        
        thunkAPI.dispatch(read_licencia());
        return data.response
        } catch (error) {
            console.log(error);
        }
        } 
        )
        const update_licencias = createAsyncThunk(
            'update_licencias', 
            async (payload) => {
              const { parametro, datos } = payload;
              
                try {
                const {data}=await axios.put(`https://validacionback-production.up.railway.app/api/clientes/update/${parametro}`, datos)
                thunkAPI.dispatch(read_licencia());
                return data.response

                } catch (error) {
                }
            } 
          )
          const read_licenciaAuth = createAsyncThunk(
            'read_licenciaAuth', 
            async(payload)=>{
                const { author, page } = payload;
                console.log(author);
            try {
            const {data}=await axios.get(`https://validacionback-production.up.railway.app/api/clientes/author?author=${author}&page=${page}`)
           console.log(data);
            
            return data
            } catch (error) {
                console.log(error);
            }
            } 
            )
            const read_Alllicencias = createAsyncThunk(
                'read_Alllicencias', 
                async()=>{
                    
                try {
                const {data}=await axios.get(`https://validacionback-production.up.railway.app/api/clientes/todos`)
               console.log(data.response);
                
                return data.response
                } catch (error) {
                    console.log(error);
                }
                } 
                )
  const licenciaActions ={create_licencia, read_licencia, delete_licencia, update_licencias, read_licenciaAuth, read_Alllicencias}
export default licenciaActions