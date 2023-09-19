import React, { useEffect, useRef, useState } from 'react';
import adminActions from '../../redux/actions/admins.js';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
export default function eliminaUsuario() {
const [selectUser, setSelectUser]=useState('')
const dispatch=useDispatch()
const inputSelectUser=useRef()
useEffect(() => {
    dispatch(adminActions.read_admins())
}, []);
const admins=useSelector((store)=>store.admins.admins)
function captureSelect(){
    setSelectUser(inputSelectUser.current.value.trim())
}
const datitos={
    usuario:selectUser
}
async function deleteUser(){
try {
if(datitos){
await dispatch(adminActions.delete_admins(datitos))
Swal.fire({
    position: 'center',
    icon: 'success',
    title: 'usuario eliminado',
    showConfirmButton: false,
    timer: 1500,
});
window.location.reload()
}else{
Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: 'No se elimino',
    timer: 1500,
});
}
} catch (error) {
    console.log(error);
}
}
  return (
    <div className='lg:w-[80%] sm:w-[90%] w-[95%] bg-[white] h-auto rounded-[10px] border-solid border-[1px] border-[gray] flex flex-col justify-around items-center py-[2rem] gap-5'>
    <p className='text-[2rem]'>Elimina un usuario</p>
    <select onChange={captureSelect} ref={inputSelectUser} className='w-[90%]  border-solid border-[1px] border-[gray] rounded-[5px] px-[1rem] placeholder:px-[0.8rem] h-[2.1rem]' name="" id="">
      <option  value="">Selecciona el usuario</option>
      {admins?.map(admin=>(
      <option key={admin._id} value={admin.usuario}>{admin.usuario}</option>
    ))}
    </select>
      <button onClick={deleteUser} className='bg-[red] w-[40%] h-[2.5rem] text-[white] rounded-[10px] hover:bg-[#a05353]'>Eliminar</button>
    </div>
  );
}
