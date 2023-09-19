import React, { useEffect, useRef, useState } from 'react';
import adminActions from '../../redux/actions/admins.js';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
export default function controUsuarios() {
const [userValue, setUserValue]=useState('')
const [addFolioValue, setAddFolioValue]=useState('')
const userSelect=useRef()
const AgregarFolio=useRef()
const dispatch=useDispatch()
function capturarUsuario(){
setUserValue(userSelect.current.value.trim())
}
function capturarValorFolios(){
setAddFolioValue(AgregarFolio.current.value.trim())
}
async function agregarMasFolios(){
try {
const payload = {
usuario: userValue,
folios: addFolioValue,
}
await dispatch(adminActions.update_admins(payload))
Swal.fire({
    position: 'center',
    icon: 'success',
    title: 'Folios agregados con éxito',
    showConfirmButton: false,
    timer: 1500,
});
window.location.reload();
setUserValue('')
setAddFolioValue('')  
} catch (error) {
  Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: 'No se pudo agregar los folios!'
  });
}
}
useEffect(() => {
    dispatch(adminActions.read_admins())
}, []);
const admins=useSelector((store)=>store.admins.admins)
const adminFiltered = Array.isArray(admins) ? admins.filter(admin => admin.rol === 2) : [];
  return (
    <div className='w-[90%] bg-[white] h-auto rounded-[10px] border-solid border-[1px] border-[gray] flex flex-col justify-around items-center py-[2rem] gap-5'>
    <p className='text-[2rem]'>Panel de usuarios</p>
    <p>Elige el usuario a asignar Folios</p>
    <div className='w-[70%] h-[30vh] bg-[black] flex flex-col justify-around rounded-[5px] px-[1.5rem]'>
    <p className='text-[white]' >Usuario:</p>
    <select onChange={capturarUsuario} ref={userSelect} className='w-[80%]'>
    <option value=''>Selecciona el admin</option>
    {adminFiltered.map(admin=>(
    <option value={admin.usuario}>{admin.usuario}</option>
    ))}
    </select>
    <input ref={AgregarFolio} onChange={capturarValorFolios}  className='lg:w-[30%] sm:w-[50%]  px-[1rem] py-[0.3rem] rounded-[5px]' type='number' placeholder='N° folios'/>
    <button onClick={agregarMasFolios} className='bg-[green] text-[white] px-[1rem] py-[0.3rem] rounded-[10px] hover:bg-[#53a05d]  w-[90%]'>Añadir</button>
    </div>
    </div>
  );
}
