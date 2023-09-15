import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import licenciaActions from '../../redux/actions/licenciaAction.js';
export default function Coahuila() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState('');
  const inputSearch = useRef();

  useEffect(() => {
    dispatch(licenciaActions.read_licencia());
  }, []);

  const licencia = useSelector((store) => store.licencias.licencias);
  const licenciaCoahuila=licencia.filter(licencia=>licencia.estado_id.nombre === 'Coahuila')

  console.log(licencia);
  console.log(licenciaCoahuila);
  ;

  function captureSearch() {
    setSearchValue(inputSearch.current.value);
    
  }
console.log(searchValue);
async function navigateValidation() {
  try {
    const searchValueNormalized = searchValue.toLowerCase().replace(/-/g, '');
    
    const foundLicencia = licenciaCoahuila.find((item) =>
      item.folio.replace(/-/g, '').toLowerCase().includes(searchValueNormalized))

console.log(foundLicencia );
    if (foundLicencia ) {
      navigate(`/validacion/coahuila/${foundLicencia.folio}`);
    } else {
      alert('No se han encontrado resultados con su búsqueda');
    }
  } catch (error) {
    console.log(error);
  }
}
  return (
    <div className='w-full h-screen flex flex-col'>
      <div className='w-full h-[8vh] bg-[#186322] flex items-center sm:justify-end justify-center px-[2rem]'>
        <p className=' text-[white] sm:font-medium text-[0.8rem] sm:text-[1rem]'>Coahuila - Gobierno del Estado.</p>
      </div>
      <div className='w-full h-[96vh]  bg-[url("https://firebasestorage.googleapis.com/v0/b/validacion-de-licencias-c813d.appspot.com/o/Coahuila%2Ftextura.jpg?alt=media&token=956cfbba-4c8a-41d0-bbbb-46fd9a5e5212")] sm:bg-center sm:bg-no-repeat sm:bg-cover lg:bg-repeat lg:bg-contain lg:bg-center flex flex-col items-center py-[4rem] sm:gap-5 gap-10'>
        <img className='lg:w-[25rem] sm:w-[20rem] w-[17rem]' src="https://firebasestorage.googleapis.com/v0/b/validacion-de-licencias-c813d.appspot.com/o/Coahuila%2Flogo.png?alt=media&token=4fa6156b-cf24-4180-ac88-f6e8624879e4" alt="" />
        <div className='bg-[white] border-solid border-[1px] border-[#186322] lg:w-[30%] sm:w-[60%] h-auto justify-around py-[1rem] px-[1.5rem] rounded-[10px] flex flex-col gap-5'>
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
          <button onClick={navigateValidation} className='bg-[#186322] rounded-[10px] text-[white] py-[0.5rem]'>
            Buscar
          </button>
        </div>
      </div>
    </div>
  );
}
