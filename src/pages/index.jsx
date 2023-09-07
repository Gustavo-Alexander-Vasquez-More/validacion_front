import React, { useRef, useState } from 'react';
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
function captureUser(){
setUserValue(inputUser.current.value)
}
function capturePassword(){
setPasswordValue(inputPassword.current.value)
}

async function logIn(){
const datos={
usuario:userValue,
contraseña:passwordValue
}
try {
  await dispatch(adminActions.login_admins(datos))
  const user = localStorage.getItem('token');
    if (user) {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Successful Loged in!',
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


  return (
    <div className=' w-full h-screen flex justify-center items-center bg-[#b3b3b3]'>
      <div className=' w-[50%] h-auto flex flex-col items-center justify-around gap-[2rem] py-[1.5rem] '>
        <p className='text-[2rem] font-bold text-[white]'>Inicio de Sesion</p>
        <div className='flex flex-col w-[60%] gap-2'>
        <p>Nombre de usuario:</p>
        <input ref={inputUser} onChange={captureUser} className='h-[2.5rem] w-[100%] placeholder:text-center rounded-[10px] px-[1rem]' type="text"  placeholder='Escriba su nombre de usuario'/>
        </div>
        <div className='flex flex-col  w-[60%] gap-2'>
        <p>Contraseña</p>
        <input ref={inputPassword} onChange={capturePassword} className='h-[2.5rem] w-[100%] placeholder:text-center rounded-[10px] px-[1rem]' type="password" placeholder='Escriba su contraseña'/>
        </div>
        <Anchor onClick={logIn}  className='bg-[#4687ff] text-[white] py-[0.5rem] w-[30%] rounded-[10px] text-center'>
        Ingresar
        </Anchor>
      </div>
    </div>
  );
}
