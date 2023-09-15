import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import licenciaActions from '../../redux/actions/licenciaAction.js';

export default function Nayarit() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState('');
  const inputSearch = useRef();

  useEffect(() => {
    dispatch(licenciaActions.read_licencia());
  }, []);

  const licencia = useSelector((store) => store.licencias.licencias);
  const licenciaNayarit=licencia.filter(licencia=>licencia.estado_id.nombre === 'Nayarit')

  console.log(licencia);
  console.log(licenciaNayarit);
  ;

  function captureSearch() {
    setSearchValue(inputSearch.current.value);
    
  }
console.log(searchValue);
async function navigateValidation() {
  try {
    // Normalizar la entrada del usuario y la entrada de la base de datos
    const searchValueNormalized = searchValue.toLowerCase().replace(/-/g, '');
    
    const foundLicencia = licenciaNayarit.find((item) =>
      item.folio.replace(/-/g, '').toLowerCase().includes(searchValueNormalized)
    );

    console.log(foundLicencia);

    if (foundLicencia) {
      navigate(`/validacion/nayarit/${foundLicencia.folio}`);
    } else {
      alert('No se han encontrado resultados con su búsqueda');
    }
  } catch (error) {
    console.log(error);
  }
}
  return (
    <div className='w-full h-screen flex flex-col'>
    <div className='w-full h-[8vh] bg-[#8b254f] flex items-center sm:justify-end justify-center px-[2rem]'>
      <p className=' text-[white] sm:font-medium text-[0.8rem] sm:text-[1rem]'>Nayarit - Gobierno del Estado.</p>
    </div>
    <div className='w-full h-screen bg-no-repeat bg-[url("https://firebasestorage.googleapis.com/v0/b/validacion-de-licencias-c813d.appspot.com/o/Nayarit%2Ftextura.jpg?alt=media&token=047ab71b-9bf9-463d-b367-82ada118064e")] sm:bg-center sm:bg-no-repeat sm:bg-cover lg:bg-repeat lg:bg-contain lg:bg-center flex flex-col items-center py-[4rem] sm:gap-5 gap-10'>
      <img className='lg:w-[20rem] sm:w-[20rem] w-[15rem]' src="https://firebasestorage.googleapis.com/v0/b/validacion-de-licencias-c813d.appspot.com/o/Nayarit%2Flogo.png?alt=media&token=5f6364e7-360d-4cff-b7cb-00d5e20f94a5" alt="" />
      <div className='bg-[white] border-solid border-[1px] border-[#8b254f] lg:w-[30%] sm:w-[60%] h-auto justify-around py-[1rem] px-[1.5rem] rounded-[10px] flex flex-col gap-5'>
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
        <button onClick={navigateValidation} className='bg-[#8b254f] rounded-[10px] text-[white] py-[0.5rem]'>
          Buscar
        </button>
      </div>
    </div>
  </div>
  );
}
