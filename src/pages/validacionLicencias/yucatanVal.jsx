import React, { useEffect } from 'react';
import licenciaActions from '../../redux/actions/licenciaAction';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Link as Anchor } from 'react-router-dom';
export default function yucatanVal() {
  const dispatch=useDispatch()
  const folio = useParams().folio;
  const pagina=localStorage.getItem('pagina')
  const page=parseInt(pagina)

  const rol =localStorage.getItem('rol')
  const usuario=localStorage.getItem('usuario')
  if(rol === '1' || rol ==='2' ){
    useEffect(() => {
      dispatch(licenciaActions.read_licencia(page))
      dispatch(licenciaActions.read_Alllicencias())
    }, [dispatch]);
  }

  if(rol === '3'){
    const payload={
      page:page,
      author:usuario
      }
    useEffect(() => {
      dispatch(licenciaActions.read_licenciaAuth(payload))
      dispatch(licenciaActions.read_Alllicencias())
    }, [dispatch]);
  }
  useEffect(() => {
    dispatch(licenciaActions.read_Alllicencias())
    }, [dispatch]);
  
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
    const licencias=useSelector((store)=>store.licencias?.licencias)
    const licencia=licencias.response
    const allLicencia=useSelector((store) => store.licencias?.AllLicencias);
    const licenciaYucatan=licencia?.filter(licencia=>licencia.estado_id.nombre === 'Yucatán')
    const licenciaYucatan2=allLicencia?.filter(licencia=>licencia.estado_id.nombre === 'Yucatán')
    const licenciaEncontrada = licenciaYucatan?.find((item) => item.folio === folio);
    const licenciaEncontradaAll = licenciaYucatan2?.find((item) => item.folio === folio);
  function formatearFecha(fechaISO8601) {
    const fecha = new Date(fechaISO8601);
    const dia = fecha.getUTCDate();
    const mes = fecha.getUTCMonth() + 1; // Sumar 1 al mes porque enero es 0
    const anio = fecha.getUTCFullYear();
    return `${dia.toString().padStart(2, '0')}-${mes.toString().padStart(2, '0')}-${anio}`;
  }const token=localStorage.getItem('token')

  function deletePage(){
  localStorage.removeItem('pagina')
  }
  return (
    <div className='w-full h-screen  sm:px-[8rem] flex flex-col items-center sm:block'>
    <div className=' w-full h-[15vh] flex justify-center items-end'>
    <img className='lg:w-[15rem] sm:w-[10rem]  h-[5rem]' src="https://firebasestorage.googleapis.com/v0/b/validacion-de-licencias-c813d.appspot.com/o/Yucatan%2Flogo.png?alt=media&token=87631a03-8cc8-4726-b603-93ac18efaeb1" alt="" />
    </div>
    <div className='w-full h-[90vh] flex'>
    <div className=' lg:w-[60%] lg:h-[90vh] flex sm:items-end lg:py-[2rem] sm:py-[1.5rem]  w-full justify-center items-center '>
    <div className='w-[80%] sm:w-[30%] h-[70vh] absolute lg:w-[25%] lg:h-[80vh] sm:right-[55%] sm:h-[80vh]  lg:right-[60%] border-solid border-[1px] border-[#c7c4c4] bg-[white] animate-rotate-x rounded-[5px]'>
    <div className='w-full h-[5vh]  text-[#2f318d] flex justify-center items-center text-[1.2rem] border-solid border-[1px] border-[#c7c4c4]'>Datos personales</div>
    <div className='w-full h-[15vh] flex justify-center py-[1rem]'>
    <img className='h-[13vh] w-[6rem]' src={licenciaEncontradaAll ? licenciaEncontradaAll.foto : (licenciaEncontrada ? licenciaEncontrada.foto : 'nothing')} alt="" />
    </div>
    <div className='w-full h-[49vh] px-[1.5rem] flex flex-col gap-1 py-[0.5rem]'>
    <p className='text-[#4e4e4e] sm:text-[1rem] text-[0.8rem]'>NOMBRE COMPLETO</p>
    <div className='border-[1px] border-solid border-[#c7c4c4] rounded-[5px] h-[2.5rem] flex items-center px-[1rem]'>
  <p className='text-[#000000]'>
    {licenciaEncontradaAll ? licenciaEncontradaAll.nombre : (licenciaEncontrada ? licenciaEncontrada.nombre : 'Nombre no encontrado')}
  </p>
</div>

<p className='text-[#4e4e4e] sm:text-[1rem] text-[0.8rem]'>FOLIO</p>
<div className='border-[1px] border-solid border-[#c7c4c4] rounded-[5px] h-[2.5rem] flex items-center px-[1rem]'>
  <p className='text-[#000000]'>
    {licenciaEncontradaAll ? licenciaEncontradaAll.folio : (licenciaEncontrada ? licenciaEncontrada.folio : 'Folio no encontrado')}
  </p>
</div>

<p className='text-[#4e4e4e] sm:text-[1rem] text-[0.8rem]'>TIPO</p>
<div className='border-[1px] border-solid border-[#c7c4c4] rounded-[5px] h-[2.5rem] flex items-center px-[1rem]'>
  <p className='text-[#000000]'>
    {licenciaEncontradaAll ? licenciaEncontradaAll.tipo : (licenciaEncontrada ? licenciaEncontrada.tipo : 'Tipo no encontrado')}
  </p>
</div>

<p className='text-[#4e4e4e] sm:text-[1rem] text-[0.8rem]'>RFC / CURP</p>
<div className='border-[1px] border-solid border-[#c7c4c4] rounded-[5px] h-[2.5rem] flex items-center px-[1rem]'>
  <p className='text-[#000000]'>
    {licenciaEncontradaAll ? licenciaEncontradaAll.rfc_curp : (licenciaEncontrada ? licenciaEncontrada.rfc_curp : 'Folio no encontrado')}
  </p>
</div>

<p className='text-[#4e4e4e] sm:text-[1rem] text-[0.8rem]'>FECHA DE EXPEDICIÓN</p>
<div className='border-[1px] border-solid border-[#c7c4c4] rounded-[5px] h-[2.5rem] flex items-center px-[1rem]'>
  <p className='text-[#000000]'>
    {licenciaEncontradaAll ? formatearFecha(licenciaEncontradaAll.expedicion) : (licenciaEncontrada ? formatearFecha(licenciaEncontrada.expedicion) : 'Fecha no encontrada')}
  </p>
</div>

<p className='text-[#4e4e4e] sm:text-[1rem] text-[0.8rem]'>VIGENCIA</p>
<div className='border-[1px] border-solid border-[#c7c4c4] rounded-[5px] h-[2.5rem] flex items-center px-[1rem]'>
  <p className='text-[#000000]'>
    {licenciaEncontradaAll ? licenciaEncontradaAll.vigencia : (licenciaEncontrada ? licenciaEncontrada.vigencia : 'Fecha no encontrada')}
  </p>
  </div>
    </div>
    </div>
    <div className='bg-[url("https://firebasestorage.googleapis.com/v0/b/validacion-de-licencias-c813d.appspot.com/o/Yucatan%2F2.png?alt=media&token=4e7d09d8-90cb-46dc-8cfa-6fe8b6877776")] w-full h-[30vh] bg-contain bg-no-repeat'></div>
    </div>
    
    <div className='hidden absolute lg:w-[40%] sm:w-[35%] lg:h-[30vh] sm:h-[29vh] bg-[white] lg:left-[50%] lg:bottom-[50%] sm:left-[50%] sm:bottom-[50%] lg:px-[3rem] sm:px-[2rem] border-[1px] border-solid border-[#c7c4c4] font-semibold sm:flex flex-col justify-around py-[2rem] items-center text-center animate-rotate-x rounded-[5px]'>
    <p className='text-[#2f318d] lg:text-[1.5rem]'>Validación de licencias de conducir</p>
    <img className='w-[15rem]' src="https://firebasestorage.googleapis.com/v0/b/validacion-de-licencias-c813d.appspot.com/o/Yucatan%2Flogo.png?alt=media&token=87631a03-8cc8-4726-b603-93ac18efaeb1" alt="" />
    </div>
    </div>
    {token && (

<Anchor to={"/panelAdministrador"} onClick={deletePage} className=' flex justify-center items-center absolute lg:left-[70%] sm:left-[55%] lg:bottom-[30%] sm:top-[60%] top-[95%] bg-[#00b7ff] px-[1.5rem] py-[0.8rem] rounded-[10px] hover:bg-[#4662ff] text-white '>Regresar al panel</Anchor>
)}
    </div>
  );
}
