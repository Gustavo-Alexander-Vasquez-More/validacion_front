import React from 'react';
import { Link as Anchor } from 'react-router-dom';
/*ESTE ES EL LOGIN*/
export default function index() {
  return (
    <div className=' w-full h-screen flex justify-center items-center bg-[#b3b3b3]'>
      <div className=' w-[50%] h-auto flex flex-col items-center justify-around gap-[2rem] py-[1.5rem] '>
        <p className='text-[2rem] font-bold text-[white]'>Inicio de Sesion</p>
        <div className='flex flex-col w-[60%] gap-2'>
        <p>Nombre de usuario:</p>
        <input className='h-[2.5rem] w-[100%] placeholder:text-center rounded-[10px]' type="text"  placeholder='Escriba su nombre de usuario'/>
        </div>
        <div className='flex flex-col  w-[60%] gap-2'>
        <p>Contraseña</p>
        <input className='h-[2.5rem] w-[100%] placeholder:text-center rounded-[10px]' type="password" placeholder='Escriba su contraseña'/>
        </div>
        <Anchor to={'/panelAdministrador'} className='bg-[#4687ff] text-[white] py-[0.5rem] w-[30%] rounded-[10px] text-center'>
        Ingresar
        </Anchor>
      </div>
    </div>
  );
}
