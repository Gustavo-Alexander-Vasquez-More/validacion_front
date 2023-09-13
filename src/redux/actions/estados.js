import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const read_estados = createAsyncThunk(
    'read_estados', 
    async()=>{
        try {
        const {data}=await axios.get('https://validacionback-production.up.railway.app/api/estados')
        return data.response
        } catch (error) {
        }
    } 
    
    )
    const estadosActions = { read_estados}
    export default estadosActions