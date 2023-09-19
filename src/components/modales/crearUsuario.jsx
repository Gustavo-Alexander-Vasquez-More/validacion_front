import React, { useRef, useState } from 'react';
import adminActions from '../../redux/actions/admins.js';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';

export default function crearUsuarios() {
const dispatch=useDispatch()    
const [passwordValue, setPasswordValue]=useState('')
console.log(passwordValue);
const [usuarioValue, setUsuarioValue]=useState('')
console.log(usuarioValue);
const [folioValue, setFolioValue]=useState('')
console.log(folioValue);
const [rolValue, setRolValue]=useState('')
console.log(rolValue);
const inputUsuario=useRef()
const inputPassword=useRef()
const inputFolio=useRef()
const inputRol=useRef()
function captureUsuario(){
  setUsuarioValue(inputUsuario.current.value.trim())
}

function capturePassword(){
  setPasswordValue(inputPassword.current.value.trim())
}
function captureFolio(){
  setFolioValue(inputFolio.current.value.trim())
}
function captureRol(){
  setRolValue(inputRol.current.value.trim())
}
  
async function CrearUsuario() {
  try {
    const datos = {
      usuario: usuarioValue,
      contraseña: passwordValue,
      rol: rolValue,
      folios: folioValue
    };

    // Dispatch para crear un usuario
    await dispatch(adminActions.create_admins(datos));

    // Mostrar mensaje de éxito
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Registro exitoso',
      showConfirmButton: false,
      timer: 1500
    });
    window.location.reload();
    setUsuarioValue('');
    setPasswordValue('');
    setFolioValue('');
    setRolValue('');
} catch (error) {
    // Mostrar mensaje de error
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'No se pudo registrar!'
    });
  }
}

   
  return (
    <div className='lg:w-[60%] sm:w-[70%] w-[95%] h-[100vh] bg-[white] sm:h-auto rounded-[10px] border-solid border-[1px] border-[gray] flex flex-col justify-around items-center lg:py-[2rem] sm:py-[0.6rem] sm:gap-4 lg:gap-5'>
    <p className='text-[2rem]'>Crea un usuario</p>
    <div className='flex flex-col lg:px-[1rem] sm:w-[85%] lg:w-[73%] w-[73%]'>
    <p>Usuario:</p>
    <input ref={inputUsuario} onChange={captureUsuario} className='w-[99%]  border-solid border-[1px] border-[gray] rounded-[5px] px-[1rem] placeholder:px-[0.1rem] h-[2rem]' type="text" placeholder='Nombre de usuario' />
    </div>
    <div className='flex flex-col lg:px-[1rem] sm:w-[85%] lg:w-[73%] w-[73%]'>
    <p>Contraseña:</p>
    <input onChange={capturePassword} ref={inputPassword} className='w-[99%]  border-solid border-[1px] border-[gray] rounded-[5px] px-[1rem] placeholder:px-[0.1rem] h-[2rem]' type="password" placeholder='Escriba la contraseña ' />
    </div>
    <div className='flex flex-col lg:px-[1rem] sm:w-[85%] lg:w-[73%] w-[73%] '>
    <p>Rol de usuario:</p>
    <p>Rol 1: Super-admin (Tiene acceso al panel completo)</p>
    <p>Rol 2: Admin común (Tiene restricciones en el panel)</p>
    <input onChange={captureRol} ref={inputRol} className='w-[99%]  border-solid border-[1px] border-[gray] rounded-[5px] px-[1rem] placeholder:px-[0.1rem] h-[2rem]' type="number" placeholder='Rol 1 o Rol 2' />
    </div>
    <div className='flex flex-col lg:px-[1rem] sm:w-[85%] lg:w-[73%] w-[73%]'>
    <p>N° de folios:</p>
    <input onChange={captureFolio} ref={inputFolio} className='w-[99%]  border-solid border-[1px] border-[gray] rounded-[5px] px-[1rem] placeholder:px-[0.1rem] h-[2rem]' type="number" placeholder='¿Con cuantos folios empieza?' />
    </div>
    <button onClick={CrearUsuario} className='bg-[#333333] w-[45%] h-[2.5rem] text-[white] rounded-[10px] hover:bg-[#5353a0]'>Crear usuario</button>
    </div>
  );
}
