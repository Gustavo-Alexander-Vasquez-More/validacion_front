import React, { useEffect } from 'react';
import licenciaActions from '../../redux/actions/licenciaAction';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

export default function sinaloaVal() {
  const dispatch=useDispatch()
  const folio = useParams();
    console.log(folio);
  
    useEffect(() => {
      dispatch(licenciaActions.read_licencia())
    }, []);
  
    useEffect(() => {
      // Agregar un manejador de eventos al montar el componente
      document.addEventListener('contextmenu', disableRightClick);
      
      // Eliminar el manejador de eventos al desmontar el componente
      return () => {
        document.removeEventListener('contextmenu', disableRightClick);
      };
    }, []);
  
    function disableRightClick(event) {
      event.preventDefault();
      alert('Prohibido realizar clic derecho')
    }
    const licencia=useSelector((store)=>store.licencias.licencias)
    const licenciaSinaloa=licencia.filter(licencia=>licencia.estado_id.nombre === 'Sinaloa')
    console.log(licencia);
  console.log(licenciaSinaloa);
    const licenciaEncontrada = licenciaSinaloa.find((item) => item.folio === folio.folio);
  console.log(licenciaEncontrada);
  function formatearFecha(fechaISO8601) {
    const fecha = new Date(fechaISO8601);
    const dia = fecha.getUTCDate();
    const mes = fecha.getUTCMonth() + 1; // Sumar 1 al mes porque enero es 0
    const anio = fecha.getUTCFullYear();
    return `${dia.toString().padStart(2, '0')}-${mes.toString().padStart(2, '0')}-${anio}`;
  }
  return (
    <div className='w-full h-screen  sm:px-[8rem] flex flex-col items-center sm:block'>
    <div className=' w-full h-[15vh] flex justify-center items-end'>
    <img className='lg:w-[15rem] sm:w-[10rem] w-[12rem] h-[6rem]' src="https://firebasestorage.googleapis.com/v0/b/validacion-de-licencias-c813d.appspot.com/o/Sinaloa%2Flogo.png?alt=media&token=6b0bb4f1-2d17-45dd-a6c7-ff74fd735371" alt="" />
    </div>
    <div className='w-full h-[90vh] flex'>
    <div className='lg:w-[60%] lg:h-[90vh] flex sm:items-end lg:py-[2rem] sm:py-[1.5rem]  w-full justify-center items-center'>
    <div className='h-[70vh] absolute lg:w-[25%] lg:h-[80vh] sm:right-[55%] sm:h-[80vh]  lg:right-[60%] border-solid border-[1px] border-[#c7c4c4] bg-[white] animate-rotate-x rounded-[5px]'>
    <div className='w-full h-[5vh]  text-[#8d2f4b] flex justify-center items-center text-[1.2rem] border-solid border-[1px] border-[#c7c4c4]'>Datos personales</div>
    <div className='w-full h-[15vh] flex justify-center py-[1rem]'>
        <img className='h-[13vh] w-[6rem]' src={licenciaEncontrada ? licenciaEncontrada.foto : 'nothing' } alt="" />
    </div>
    <div className='w-full h-[49vh] px-[1.5rem] flex flex-col gap-1 py-[0.5rem]'>
    <p className='text-[#8d2f4b] sm:text-[1rem] text-[0.8rem]'>NOMBRE COMPLETO</p>
    <div className='border-[1px] border-solid border-[#c7c4c4] rounded-[5px] h-[2.5rem] flex items-center px-[1rem]'><p className='text-[#000000]'>{licenciaEncontrada ? licenciaEncontrada.nombre : 'Nombre no encontrado'}</p>
</div>
    <p className='text-[#8d2f4b] sm:text-[1rem] text-[0.8rem]'>FOLIO</p>
    <div className='border-[1px] border-solid border-[#c7c4c4] rounded-[5px] h-[2.5rem] flex items-center px-[1rem]'><p className='text-[#000000]'>{licenciaEncontrada ? licenciaEncontrada.folio : 'Nombre no encontrado'}</p></div>
    <p className='text-[#8d2f4b] sm:text-[1rem] text-[0.8rem]'>TIPO</p>
    <div className='border-[1px] border-solid border-[#c7c4c4] rounded-[5px] h-[2.5rem] flex items-center px-[1rem]'><p className='text-[#000000]'>{licenciaEncontrada ? licenciaEncontrada.tipo : 'Tipo no encontrado'}</p></div>
    <p className='text-[#8d2f4b] sm:text-[1rem] text-[0.8rem]'>RFC / CURP</p>
    <div className='border-[1px] border-solid border-[#c7c4c4] rounded-[5px] h-[2.5rem] flex items-center px-[1rem]'><p className='text-[#000000]'>{licenciaEncontrada ? licenciaEncontrada.rfc_curp : 'Folio no encontrado'}</p></div>
    <p className='text-[#8d2f4b] sm:text-[1rem] text-[0.8rem]'>FECHA DE EXPEDICIÓN</p>
    <div className='border-[1px] border-solid border-[#c7c4c4] rounded-[5px] h-[2.5rem] flex items-center px-[1rem]'><p className='text-[#000000]'>{licenciaEncontrada ? formatearFecha(licenciaEncontrada.expedicion) : 'Fecha no encontrada'}</p></div>
    <p className='text-[#8d2f4b] sm:text-[1rem] text-[0.8rem]'>VIGENCIA</p>
    <div className='border-[1px] border-solid border-[#c7c4c4] rounded-[5px] h-[2.5rem] flex items-center px-[1rem]'><p className='text-[#000000]'>{licenciaEncontrada ? formatearFecha(licenciaEncontrada.vigencia) : 'Fecha no encontrada'}</p></div>
    </div>
    </div>
    <div className='bg-[url("https://firebasestorage.googleapis.com/v0/b/validacion-de-licencias-c813d.appspot.com/o/Sinaloa%2F2.png?alt=media&token=11906043-185f-4238-a4d7-b5274d9d8366")] w-full h-[30vh] bg-contain bg-no-repeat'></div>
    </div>
    
    <div className='hidden absolute lg:w-[40%] sm:w-[35%] lg:h-[30vh] sm:h-[29vh] bg-[white] lg:left-[50%] lg:bottom-[50%] sm:left-[50%] sm:bottom-[50%] lg:px-[3rem] sm:px-[2rem] border-[1px] border-solid border-[#c7c4c4] font-semibold sm:flex flex-col justify-around py-[2rem] items-center text-center animate-rotate-x rounded-[5px]'>
    <p className='text-[#8d2f4b] lg:text-[1.5rem]'>Validación de licencias de conducir</p>
    <img className='w-[15rem]' src="https://firebasestorage.googleapis.com/v0/b/validacion-de-licencias-c813d.appspot.com/o/Sinaloa%2Flogo.png?alt=media&token=6b0bb4f1-2d17-45dd-a6c7-ff74fd735371" alt="" />
    </div>
    </div>
      
    </div>
  );
}
