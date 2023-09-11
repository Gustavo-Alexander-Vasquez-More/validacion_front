import React from 'react';

export default function tabascoVal() {
  return (
    <div className='w-full h-screen  px-[8rem]'>
    <div className=' w-full h-[20vh] flex justify-center items-end'>
    <img className='w-[15rem] h-[8rem]' src="../public/Tabasco/logo.png" alt="" />
    </div>
    <div className='w-full h-[80vh] flex'>
    <div className=' w-[60%] h-[80vh]  flex items-end py-[2rem] bg-[white] '>
    <div className='absolute w-[25%] h-[71vh] right-[60%] border-solid border-[1px] border-[#c7c4c4] bg-[white] animate-rotate-x'>
    <div className='w-full h-[5vh]  text-[#7c2a2a] flex justify-center items-center text-[1.2rem] border-solid border-[1px] border-[#c7c4c4]'>Datos personales</div>
    <div className='w-full h-[15vh] flex justify-center py-[1rem]'>
        <img className='h-[13vh] w-[6rem]' src="https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cGVyc29uYXxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80" alt="" />
    </div>
    <div className='w-full h-[49vh] px-[1.5rem] flex flex-col gap-1 py-[0.5rem]'>
    <p className='text-[#7c2a2a]'>NOMBRE COMPLETO</p>
    <input className='border-[1px] border-solid border-[#c7c4c4] rounded-[5px] h-[2.5rem]' type="text" />
    <p className='text-[#7c2a2a]'>FOLIO / TIPO</p>
    <input className='border-[1px] border-solid border-[#c7c4c4] rounded-[5px] h-[2.5rem]' type="text" />
    <p className='text-[#7c2a2a]'>RFC / CURP</p>
    <input className='border-[1px] border-solid border-[#c7c4c4] rounded-[5px] h-[2.5rem]' type="text" />
    <p className='text-[#7c2a2a]'>FECHA DE EXPEDICIÓN</p>
    <input className='border-[1px] border-solid border-[#c7c4c4] rounded-[5px] h-[2.5rem]' type="text" name="" id="" />
    <p className='text-[#7c2a2a]'>VIGENCIA</p>
    <input className='border-[1px] border-solid border-[#c7c4c4] rounded-[5px] h-[2.5rem]' type="text" />
    </div>
    </div>
    <div className='bg-[url("/public/Tabasco/2.png")] w-full h-[30vh] bg-contain bg-no-repeat'></div>
    </div>
    <div className='w-[40%] h-[80vh]'></div>
    <div className='absolute w-[35rem] h-[30vh] bg-[white] right-[15rem] bottom-[22rem] px-[3rem]  border-[1px] border-solid border-[#c7c4c4] font-semibold flex flex-col justify-around py-[2rem] items-center text-center animate-rotate-x rounded-[5px]'>
    <p className='text-[#7c2a2a] text-[2rem]'>Validación de licencias de conducir</p>
    <img className='w-[9rem]' src="../public/Tabasco/logo.png" alt="" />
    </div>
    </div>
      
    </div>
  );
}
