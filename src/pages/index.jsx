import React from 'react';
/*ESTE ES EL LOGIN*/
export default function index() {
  return (
    <div className=' w-full h-screen flex justify-center items-center bg-[#b3b3b3]'>
      <div className=' w-[50%] h-auto flex flex-col items-center justify-around gap-[2rem] py-[1.5rem] '>
        <p className='text-[2rem] font-bold text-[white]'>Inicio de Sesion</p>
        <input className='h-[2.5rem] w-[60%] placeholder:text-center rounded-[10px]' type="text"  placeholder='Escriba su email del usuario'/>
        <input className='h-[2.5rem] w-[60%] placeholder:text-center rounded-[10px]' type="password" placeholder='Escriba su contraseña'/>
        <button className='bg-[#4687ff] text-[white] py-[0.5rem] w-[30%] rounded-[10px]'>Ingresar</button>
      </div>
    </div>
  );
}
