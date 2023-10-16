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
console.log(userValue);
async function agregarMasFolios() {
  try {
    const adminToUpdate = adminFiltered.find((admin) => admin.usuario === userValue);
    if (!adminToUpdate) {
      throw new Error('No se encontró el usuario');
    }

    const foliosToAdd = parseInt(addFolioValue, 10);
    if (isNaN(foliosToAdd) || foliosToAdd <= 0) {
      throw new Error('La cantidad de folios a agregar debe ser un número positivo');
    }

    const updatedFolios = adminToUpdate.folios + foliosToAdd;

    const payload = {
      usuario: userValue,
      folios: updatedFolios,
    };

    await dispatch(adminActions.update_admins(payload));
    await dispatch(adminActions.read_admins());

    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Folios agregados con éxito',
      showConfirmButton: false,
      timer: 1500,
    });

    setUserValue('');
    setAddFolioValue('');
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: error.message,
    });
  }
}

useEffect(() => {
    dispatch(adminActions.read_admins())
}, []);
const admins=useSelector((store)=>store.admins.admins)
const adminFiltered = Array.isArray(admins) ? admins.filter(admin => admin.rol >= 2) : [];
  return (
    <div className='w-full h-full flex justify-center  py-[10rem] bg-[url("https://firebasestorage.googleapis.com/v0/b/validacion-de-licencias-c813d.appspot.com/o/pngtree-abstract-white-and-light-gray-wave-modern-soft-luxury-texture-with-image_1379862.jpg?alt=media&token=083e0548-05a8-404f-8bb9-6ac6703d270c")] bg-no-repeat bg-cover'>
   
    <div className='lg:w-[30%] sm:w-[70%]  h-auto rounded-[10px] border-solid border-[1px] border-[gray] flex flex-col justify-around items-center py-[2rem] gap-5'>
    <p className='text-[2rem]'>Panel de usuarios</p>
    {userValue && (
          <p>
            Este usuario tiene {adminFiltered.find((admin) => admin.usuario === userValue)?.folios || 0} folios:
          </p>
        )}
    <p>Elige el usuario y asigna más Folios</p>
    <div className='lg:w-[70%] sm:w-[70%] w-[90%] h-[30vh] bg-[black] flex flex-col justify-around rounded-[5px] px-[1.5rem]'>
    <p className='text-[white]' >Usuario:</p>
    <select onChange={capturarUsuario} ref={userSelect} className='w-[80%]'>
    <option value=''>Selecciona el admin</option>
    {adminFiltered.map(admin=>(
    <option value={admin.usuario}>{admin.usuario}</option>
    ))}
    </select>
    <input ref={AgregarFolio} onChange={capturarValorFolios}  className='lg:w-[80%] sm:w-[80%] w-[80%]  px-[1rem] py-[0.3rem] rounded-[5px]' type='number' placeholder='N° folios'/>
    <button onClick={agregarMasFolios} className='bg-[green] text-[white] px-[1rem] py-[0.3rem] rounded-[10px] hover:bg-[#53a05d]  w-[80%]'>Añadir</button>
    </div>
    </div>
    </div>
  );
}
