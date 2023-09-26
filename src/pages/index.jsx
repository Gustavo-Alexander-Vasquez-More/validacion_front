import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link as Anchor, useNavigate } from 'react-router-dom';
import adminActions from '../redux/actions/admins';
import Swal from 'sweetalert2';


/*ESTE ES EL LOGIN*/

 export default function index() {
const[userValue, setUserValue]=useState('')
const[passwordValue, setPasswordValue]=useState('')
const dispatch=useDispatch()
const inputUser=useRef()
const inputPassword=useRef()
const navigate=useNavigate()
useEffect(() => {
  const userToken = localStorage.getItem('token');
  if (userToken) {
    // Si existe un token, redirige al panel de administrador
    navigate('/panelAdministrador');
  }
}, [navigate]);
function captureUser(){
setUserValue(inputUser.current.value)
}
function capturePassword(){
setPasswordValue(inputPassword.current.value)
}

async function logIn(){
const datos={
usuario:userValue.trim(),
contraseña:passwordValue.trim()
}
try {
  await dispatch(adminActions.login_admins(datos))
  const user = localStorage.getItem('token');
    if (user) {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Bienvenido',
        showConfirmButton: false,
        timer: 3500
      })
      navigate('/panelAdministrador')
}else{
  Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: 'Usuario o contraseña incorrectos',
})
  navigate('/')
}
} catch (error) {
 console.log(error);
}
}
function handleKeyPress(event) {
  if (event.key === 'Enter') {
    // Si la tecla presionada es "Enter", llama a la función logIn
    logIn();
  }
}

  return (
    <div className=' w-full h-screen flex flex-col justify-center items-center bg-[white] bg-[url("https://firebasestorage.googleapis.com/v0/b/validacion-de-licencias-c813d.appspot.com/o/pngtree-abstract-white-and-light-gray-wave-modern-soft-luxury-texture-with-image_1379862.jpg?alt=media&token=083e0548-05a8-404f-8bb9-6ac6703d270c")] bg-no-repeat bg-cover'>
      <div className='w-full sm:w-[70%] lg:w-[50%] md:h-auto flex flex-col items-center justify-around gap-[2rem] py-[1.5rem] '>
      <img className='animate-jump-in w-[7rem] hover:animate-bounce' src="https://firebasestorage.googleapis.com/v0/b/validacion-de-licencias-c813d.appspot.com/o/MERCURIO%20LOGO.png?alt=media&token=326bbed2-17d6-49b4-ba0b-ee3eb524963a" alt="" />
        <p className='animate-fade text-[2rem] font-bold text-[black]'>Inicio de Sesión</p>
        <div className='flex flex-col w-[77%]  sm:w-[60%] gap-2'>
          
        <p className=' font-semibold'>Usuario:</p>
        <input onKeyDown={handleKeyPress} required ref={inputUser} onChange={captureUser} className='hover:border-[#5a5a5a] animate-fade h-[2.5rem] w-[100%] placeholder:text-center rounded-[10px] px-[1rem] border-solid border-[1px] border-[gray]' type="text"  placeholder='Escriba su nombre de usuario'/>
        </div>
        <div className='flex flex-col  w-[77%]  sm:w-[60%] gap-2'>
        <p className='animate-fade font-semibold'>Contraseña:</p>
        <input onKeyDown={handleKeyPress} required ref={inputPassword} onChange={capturePassword} className='hover:border-[#5a5a5a] animate-fade h-[2.5rem] w-[100%] placeholder:text-center rounded-[10px] px-[1rem] border-solid border-[1px] border-[gray]' type="password" placeholder='Escriba su contraseña'/>
        </div>
        <Anchor onClick={logIn}  className='bg-[#333333] text-[white] py-[0.5rem] w-[50%] sm:w-[30%] rounded-[10px] text-center animate-fade hover:animate-fade hover:bg-[#5a5a5a]'>
        Ingresar
        </Anchor>
      </div>
      <div className='w-full h-[30vh] flex items-end  px-[3rem] py-[3rem] justify-between'>
      <Anchor className='flex items-center'  to='https://firebasestorage.googleapis.com/v0/b/validacion-de-licencias-c813d.appspot.com/o/MERCURIO%20(1).apk?alt=media&token=34c5340a-fa6b-4c93-8198-dbbc057afed5'>
    <img className='w-[4rem]' src="https://cdn.icon-icons.com/icons2/836/PNG/512/Android_icon-icons.com_66772.png" alt="" />
        <p className=' font-bold hover:text-[#553c99]'>Descargar APP.</p>
      </Anchor>
  </div>
    </div>
  );
 }