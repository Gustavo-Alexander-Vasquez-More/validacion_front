import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import licenciaActions from '../../redux/actions/licenciaAction.js';

export default function BajaCaliforniaSur() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState('');
  const inputSearch = useRef();

  useEffect(() => {
    dispatch(licenciaActions.read_licencia());
  }, []);

  const licencia = useSelector((store) => store.licencias.licencias);
  const licenciaBajaCalSur=licencia.filter(licencia=>licencia.estado_id.nombre === 'Baja California Sur')

  console.log(licencia);
  console.log(licenciaBajaCalSur);
  ;

  function captureSearch() {
    setSearchValue(inputSearch.current.value);
    
  }
console.log(searchValue);
async function navigateValidation() {
  try {
    // Verificar si el valor de búsqueda existe en la lista de folio_tipo
    const searchValueNormalized = searchValue.toLowerCase().replace(/-/g, '');
    
    const foundLicencia = licenciaBajaCalSur.find((item) =>
      item.folio.replace(/-/g, '').toLowerCase().includes(searchValueNormalized))
console.log(foundLicencia );
    if (foundLicencia ) {
      navigate(`/validacion/bajaCaliforniaSur/${foundLicencia.folio}`);
    } else {
      alert('No se han encontrado resultados con su búsqueda');
    }
  } catch (error) {
    console.log(error);
  }
}
  return (
    <div className='w-full h-screen flex flex-col'>
    <div className='w-full h-[8vh] bg-[#992727] flex items-center justify-end px-[2rem]'>
    <p className=' text-[white] font-medium'>Baja California Sur - Gobierno del Estado.</p>
    </div>
    <div className='w-full h-[96vh] bg-[url("/public/AguasCalientes/textura.jpg")] bg-contain bg-center flex flex-col items-center py-[5rem] gap-7'>
    <img className='w-[25rem]'  src="/public/BajaCaliforniaSur/logo.png" alt="" />
    <div className='bg-[white] border-solid border-[1px] border-[#992727] w-[30%] h-auto justify-around py-[1rem] px-[1.5rem] rounded-[10px] flex flex-col gap-5'>
    <p className=' font-semibold text-[1.5rem]'>Consulta</p>
    <p>N° Folio</p>
    <input ref={inputSearch}
            onChange={captureSearch} className='border-solid border-[1px] border-[gray] rounded-[5px] h-[2.5rem] px-[1rem]' placeholder='Buscar ...' type="text" name="" id="" />
    <button onClick={navigateValidation} className='bg-[#992727] rounded-[10px] text-[white] py-[0.5rem]'>Buscar</button>    
    </div>
    </div>
    </div>
  );
}
