import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import licenciaActions from '../../redux/actions/licenciaAction.js';
export default function Chihuahua() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState('');
  const inputSearch = useRef();


  useEffect(() => {
    dispatch(licenciaActions.read_Alllicencias());
  }, [dispatch]);

  const licencia = useSelector((store) => store.licencias?.AllLicencias) || [];
  const licenciaChihuahua=Array.isArray(licencia) ? licencia?.filter(licencia => licencia.estado_id?.nombre === 'Chihuahua') : [];

  console.log(licencia);
  console.log(licenciaChihuahua);
  ;

  function captureSearch() {
    setSearchValue(inputSearch.current.value);
    
  }
console.log(searchValue);
async function navigateValidation() {
  try {
    const searchValueNormalized = searchValue.toLowerCase().replace(/-/g, '');
    
    const foundLicencia = licenciaChihuahua?.find((item) =>
      item.folio.replace(/-/g, '').toLowerCase().includes(searchValueNormalized))
console.log(foundLicencia );
    if (foundLicencia ) {
      navigate(`/validacion/chihuahua/${foundLicencia.folio}`);
    } else {
      alert('No se han encontrado resultados con su búsqueda');
    }
  } catch (error) {
    console.log(error);
  }
}
  return (
    <div className='w-full h-screen flex flex-col'>
      <div className='w-full h-[8vh] bg-[#29279e] flex items-center sm:justify-end justify-center px-[2rem]'>
        <p className=' text-[white] sm:font-medium text-[0.8rem] sm:text-[1rem]'>Chihuahua - Gobierno del Estado.</p>
      </div>
      <div className='bg-[url("https://firebasestorage.googleapis.com/v0/b/validacion-de-licencias-c813d.appspot.com/o/AguasCalientes%2Ftextura.png?alt=media&token=9a4ac3cc-9c8a-42d0-a9a3-b5c5a11b5e22")] bg-center  bg-cover w-full h-screen bg-no-repeat  lg:bg-[url("https://firebasestorage.googleapis.com/v0/b/validacion-de-licencias-c813d.appspot.com/o/BajaCaliforniaSur%2Ftextura.jpg?alt=media&token=b3689a98-807f-4cca-9063-3ca62ac58e4a")] sm:bg-center sm:bg-no-repeat sm:bg-cover lg:bg-no-repeat  lg:bg-fill xl:bg-no-repeat  xl:bg-fill 2xl:bg-repeat  2xl:bg-contain flex flex-col items-center py-[4rem] sm:gap-5 gap-10'>
        <img className='lg:w-[20rem] sm:w-[15rem] w-[12rem]' src="https://firebasestorage.googleapis.com/v0/b/validacion-de-licencias-c813d.appspot.com/o/Chihuahua%2Flogo.png?alt=media&token=fd2f81ab-2b10-4fca-bd33-f96624c44afd" alt="" />
        <div className='bg-[white] border-solid border-[1px] border-[#29279e] lg:w-[30%] sm:w-[60%] h-auto justify-around py-[1rem] px-[1.5rem] rounded-[10px] flex flex-col gap-5'>
          <p className=' font-semibold sm:text-[1.5rem] text-[1.2rem]'>Consulta</p>
          <p>N° Folio</p>
          <input
            ref={inputSearch}
            onChange={captureSearch}
            className='border-solid border-[1px] border-[gray] rounded-[5px] h-[2.5rem] px-[1rem]'
            placeholder='Buscar ...'
            type="text"
            name=""
            id=""
          />
          <button onClick={navigateValidation} className='bg-[#29279e] rounded-[10px] text-[white] py-[0.5rem]'>
            Buscar
          </button>
        </div>
      </div>
    </div>
  );
}
