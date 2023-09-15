import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import licenciaActions from '../../redux/actions/licenciaAction.js';

export default function Jalisco() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState('');
  const inputSearch = useRef();

  useEffect(() => {
    dispatch(licenciaActions.read_licencia());
  }, []);

  const licencia = useSelector((store) => store.licencias.licencias);
  const licenciaJalisco=licencia.filter(licencia=>licencia.estado_id.nombre === 'Jalisco')

  console.log(licencia);
  console.log(licenciaJalisco);
  ;

  function captureSearch() {
    setSearchValue(inputSearch.current.value);
    
  }
console.log(searchValue);
async function navigateValidation() {
  try {
    // Normalizar la entrada del usuario y la entrada de la base de datos
    const searchValueNormalized = searchValue.toLowerCase().replace(/-/g, '');
    
    const foundLicencia = licenciaJalisco.find((item) =>
      item.folio.replace(/-/g, '').toLowerCase().includes(searchValueNormalized)
    );

    console.log(foundLicencia);

    if (foundLicencia) {
      navigate(`/validacion/jalisco/${foundLicencia.folio}`);
    } else {
      alert('No se han encontrado resultados con su búsqueda');
    }
  } catch (error) {
    console.log(error);
  }
}
  return (
    <div className='w-full h-screen flex flex-col'>
    <div className='w-full h-[8vh] bg-[#646464] flex items-center sm:justify-end justify-center px-[2rem]'>
      <p className=' text-[white] sm:font-medium text-[0.8rem] sm:text-[1rem]'>Jalisco - Gobierno del Estado.</p>
    </div>
    <div className='w-full h-screen bg-no-repeat  bg-[url("https://firebasestorage.googleapis.com/v0/b/validacion-de-licencias-c813d.appspot.com/o/Jalisco%2Ftextura.jpg?alt=media&token=171e4125-0b4a-4e46-94f3-ec82076e0d34")] sm:bg-center sm:bg-no-repeat sm:bg-cover lg:bg-repeat lg:bg-contain lg:bg-center flex flex-col items-center py-[4rem] sm:gap-5 gap-10'>
      <img className='lg:w-[25rem] sm:w-[20rem] w-[15rem]' src="https://firebasestorage.googleapis.com/v0/b/validacion-de-licencias-c813d.appspot.com/o/Jalisco%2Flogo.png?alt=media&token=904177e7-75e6-4186-a540-12c9086ae87b" alt="" />
      <div className='bg-[white] border-solid border-[1px] border-[#646464] lg:w-[30%] sm:w-[60%] h-auto justify-around py-[1rem] px-[1.5rem] rounded-[10px] flex flex-col gap-5'>
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
        <button onClick={navigateValidation} className='bg-[#646464] rounded-[10px] text-[white] py-[0.5rem]'>
          Buscar
        </button>
      </div>
    </div>
  </div>
  );
}
