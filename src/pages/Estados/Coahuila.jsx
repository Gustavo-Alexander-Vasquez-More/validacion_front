import React from 'react';

export default function Coahuila() {
  return (
    <div className='w-full h-screen flex flex-col'>
    <div className='w-full h-[8vh] bg-[#315e1c] flex items-center justify-end px-[2rem]'>
    <p className=' text-[white] font-medium'>Coahuila - Gobierno del Estado.</p>
    </div>
    <div className='w-full h-[96vh] bg-[url("/public/AguasCalientes/textura.jpg")] bg-contain bg-center flex flex-col items-center py-[5rem] gap-7'>
    <img className='w-[25rem]'  src="/public/Coahuila/logo.png" alt="" />
    <div className='bg-[white] border-solid border-[1px] border-[#315e1c] w-[30%] h-auto justify-around py-[1rem] px-[1.5rem] rounded-[10px] flex flex-col gap-5'>
    <p className=' font-semibold text-[1.5rem]'>Consulta</p>
    <p>N° Folio</p>
    <input className='border-solid border-[1px] border-[gray] rounded-[5px] h-[2.5rem] px-[1rem]' placeholder='Buscar ...' type="text" name="" id="" />
    <button className='bg-[#315e1c] rounded-[10px] text-[white] py-[0.5rem]'>Buscar</button>    
    </div>
    </div>
    </div>
  );
}
