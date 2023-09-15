import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import licenciaActions from '../../redux/actions/licenciaAction.js';


export default function BajaCalifornia() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState('');
  const inputSearch = useRef();

  useEffect(() => {
    dispatch(licenciaActions.read_licencia());
  }, []);

  const licencia = useSelector((store) => store.licencias.licencias);
  const licenciaBajaCalNorte=licencia.filter(licencia=>licencia.estado_id.nombre === 'Baja California Norte')

  console.log(licencia);
  console.log(licenciaBajaCalNorte);
  ;

  function captureSearch() {
    setSearchValue(inputSearch.current.value);
    
  }
console.log(searchValue);
async function navigateValidation() {
  try {
    // Verificar si el valor de búsqueda existe en la lista de folio_tipo
    const searchValueNormalized = searchValue.toLowerCase().replace(/-/g, '');
    
    const foundLicencia = licenciaBajaCalNorte.find((item) =>
      item.folio.replace(/-/g, '').toLowerCase().includes(searchValueNormalized))
console.log(foundLicencia );
    if (foundLicencia ) {
      navigate(`/validacion/bajaCaliforniaNorte/${foundLicencia.folio}`);
    } else {
      alert('No se han encontrado resultados con su búsqueda');
    }
  } catch (error) {
    console.log(error);
  }
}
  return (
    <div className='w-full h-screen flex flex-col'>
      <div className='w-full h-[8vh] bg-[#701f2c] flex items-center sm:justify-end justify-center px-[2rem]'>
        <p className=' text-[white] sm:font-medium text-[0.8rem] sm:text-[1rem]'>Baja California Norte  - Gobierno del Estado.</p>
      </div>
      <div className='w-full h-[96vh] bg-no-repeat  bg-[url("https://firebasestorage.googleapis.com/v0/b/validacion-de-licencias-c813d.appspot.com/o/BajaCaliforniaNorte%2Ftextura.jpg?alt=media&token=d40631bd-6c1c-4b30-a825-419cedaa7433")] sm:bg-center sm:bg-no-repeat sm:bg-cover lg:bg-repeat lg:bg-contain lg:bg-center flex flex-col items-center py-[4rem] sm:gap-5 gap-10'>
        <img className='lg:w-[25rem] sm:w-[15rem] w-[13rem]' src="https://firebasestorage.googleapis.com/v0/b/validacion-de-licencias-c813d.appspot.com/o/BajaCaliforniaNorte%2Flogo.png?alt=media&token=3ae04f98-5656-4fe8-88da-15449a157ab2" alt="" />
        <div className='bg-[white] border-solid border-[1px] border-[#701f2c] lg:w-[30%] sm:w-[60%] h-auto justify-around py-[1rem] px-[1.5rem] rounded-[10px] flex flex-col gap-5'>
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
          <button onClick={navigateValidation} className='bg-[#701f2c] rounded-[10px] text-[white] py-[0.5rem]'>
            Buscar
          </button>
        </div>
      </div>
    </div>
  );
}
