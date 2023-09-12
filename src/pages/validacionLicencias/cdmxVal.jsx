import React, { useEffect } from 'react';
import licenciaActions from '../../redux/actions/licenciaAction';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
export default function cdmxVal() {
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
      const licenciaCdmx=licencia.filter(licencia=>licencia.estado_id.nombre === 'Ciudad de México (Distrito Federal)')
      console.log(licencia);
    
      const licenciaEncontrada = licenciaCdmx.find((item) => item.folio === folio.folio);
    console.log(licenciaEncontrada);
    function formatearFecha(fechaISO8601) {
      const fecha = new Date(fechaISO8601);
      const dia = fecha.getUTCDate();
      const mes = fecha.getUTCMonth() + 1; // Sumar 1 al mes porque enero es 0
      const anio = fecha.getUTCFullYear();
      return `${dia.toString().padStart(2, '0')}-${mes.toString().padStart(2, '0')}-${anio}`;
    }
    
      return (
        <div className='w-full h-screen  px-[8rem]'>
        <div className=' w-full h-[20vh] flex justify-center items-end'>
        <img className='w-[20rem] h-[6rem]' src="../../public/CDMX/logo.png" alt="" />
        </div>
        <div className='w-full h-[80vh] flex'>
        <div className=' w-[60%] h-[80vh]  flex items-end py-[2rem] bg-[white] '>
        <div className='absolute w-[25%] h-[71vh] right-[60%] border-solid border-[1px] border-[#c7c4c4] bg-[white] animate-rotate-x'>
        <div className='w-full h-[5vh]  text-[#a8414f] flex justify-center items-center text-[1.2rem] border-solid border-[1px] border-[#c7c4c4]'>Datos personales</div>
        <div className='w-full h-[15vh] flex justify-center py-[1rem]'>
            <img className='h-[13vh] w-[6rem]' src={licenciaEncontrada ? `http://localhost:8084/${licenciaEncontrada.foto}` : 'nothing' } alt="" />
        </div>
        <div className='w-full h-[49vh] px-[1.5rem] flex flex-col gap-1 py-[0.5rem]'>
        <p className='text-[#a8414f]'>NOMBRE COMPLETO</p>
        <div className='border-[1px] border-solid border-[#c7c4c4] rounded-[5px] h-[2.5rem] flex items-center px-[1rem]'><p className='text-[#000000]'>{licenciaEncontrada ? licenciaEncontrada.nombre : 'nothing'}</p></div>
        <p className='text-[#a8414f]'>FOLIO / TIPO</p>
        <div className='border-[1px] border-solid border-[#c7c4c4] rounded-[5px] h-[2.5rem] flex items-center px-[1rem]'><p className='text-[#000000]'>{licenciaEncontrada ? licenciaEncontrada.folio : 'nothing'}</p></div>
        <p className='text-[#a8414f]'>TIPO</p>
        <div className='border-[1px] border-solid border-[#c7c4c4] rounded-[5px] h-[2.5rem] flex items-center px-[1rem]'><p className='text-[#000000]'>{licenciaEncontrada ? licenciaEncontrada.tipo : 'nothing'}</p></div>
        <p className='text-[#a8414f]'>RFC / CURP</p>
        <div className='border-[1px] border-solid border-[#c7c4c4] rounded-[5px] h-[2.5rem] flex items-center px-[1rem]'><p className='text-[#000000]'>{licenciaEncontrada ? licenciaEncontrada.rfc_curp : 'nothing'}</p></div>
        <p className='text-[#a8414f]'>FECHA DE EXPEDICIÓN</p>
        <div className='border-[1px] border-solid border-[#c7c4c4] rounded-[5px] h-[2.5rem] flex items-center px-[1rem]'><p className='text-[#000000]'>{licenciaEncontrada ? formatearFecha(licenciaEncontrada.expedicion) : 'nothing'}</p></div>
        <p className='text-[#a8414f]'>VIGENCIA</p>
        <div className='border-[1px] border-solid border-[#c7c4c4] rounded-[5px] h-[2.5rem] flex items-center px-[1rem]'><p className='text-[#000000]'>{licenciaEncontrada ? formatearFecha(licenciaEncontrada.vigencia) : 'nothing'}</p></div>
        </div>
        </div>
        <div className='bg-[url("/public/CDMX/2.png")] w-full h-[30vh] bg-contain bg-no-repeat'></div>
        </div>
        <div className='w-[40%] h-[80vh]'></div>
        <div className='absolute w-[35rem] h-[30vh] bg-[white] right-[15rem] bottom-[22rem] px-[3rem]  border-[1px] border-solid border-[#c7c4c4] font-semibold flex flex-col justify-around py-[2rem] items-center text-center animate-rotate-x rounded-[5px]'>
        <p className='text-[#a8414f] text-[2rem]'>Validación de licencias de conducir</p>
        <img className='w-[15rem]' src="../../public/CDMX/logo.png" alt="" />
        </div>
        </div>
          
        </div>
      );
    }
    