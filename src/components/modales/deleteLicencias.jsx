import React, { useEffect, useState } from 'react';
import licenciaActions from '../../redux/actions/licenciaAction.js';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { Link as Anchor } from 'react-router-dom';
export default function deleteLicencias() {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(
    parseInt(localStorage.getItem('pagina')) || 1
  );
  const user = localStorage.getItem('usuario');
  const payload = {
    page: currentPage,
    author: user,
  };
  useEffect(() => {
    const user = localStorage.getItem('usuario');
    const payload = {
      page: currentPage,
      author: user,
    };
    localStorage.setItem('pagina', currentPage);
    dispatch(licenciaActions.read_licenciaAuth(payload));
  }, [dispatch, currentPage]);

  useEffect(() => {
  dispatch(licenciaActions.read_Alllicencias())
  }, [dispatch]);
  const licencia = useSelector((store) => store.licencias?.licencias);
  const licencias = licencia?.response || [];
  const allLicencias=useSelector((store)=>store.licencias?.AllLicencias)
  const licenciasAuth=allLicencias.filter(licencia=> licencia.author_id?.usuario === user)
  

  const handleNext = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrev = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };
  async function deleteCliente(folio) {
    const dato = { folio };
    
    try {
      if (dato) {
        const confirmation = await Swal.fire({
          title: '¿Estás seguro de que deseas eliminar esta licencia?',
          showDenyButton: true,
          
          confirmButtonText: 'Sí',
          denyButtonText: 'No',
        });
  
        if (confirmation.isConfirmed) {
          await dispatch(licenciaActions.delete_licencia(dato));
          await setCurrentPage(1);
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Cliente eliminado',
            showConfirmButton:dispatch(licenciaActions.read_licenciaAuth(payload)),
            timer: 1500,
          });
  
          // Después de eliminar, regresar a la página 1
          
        } else if (confirmation.isDenied) {
          Swal.fire('Eliminación cancelada');
        }
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'No se eliminó',
          timer: 1500,
        });
      }
    } catch (error) {
      console.error('Error al eliminar cliente:', error);
    }
  }
    
    const handleFolioClick = async (folio) => {
      try {
        
        await deleteCliente(folio);
        
      } catch (error) {
        console.error('Error al manejar el clic del folio:', error);
      }
    };
 const handleSearchChange = (event) => {
      setSearchTerm(event.target.value);
    };
   const Superadmin=localStorage.getItem('rol')
   
   const removeSpacesAndAccents = (str) => {
    // Elimina espacios y tildes
    return str.toLowerCase().replace(/ /g, '').normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  };
  const MAX_RESULTS = 5;

  const filteredLicencias = searchTerm
    ? licenciasAuth?.filter((licencia) => {
        const nombre = licencia?.nombre.toLowerCase();
        const folio = licencia?.folio.toLowerCase();
        const searchTermLower = searchTerm.toLowerCase();
        return nombre.includes(searchTermLower) || folio.includes(searchTermLower);
      }).slice(0, searchTerm === licenciasAuth[0]?.author_id.usuario.toLowerCase() ? licenciasAuth.length : MAX_RESULTS)
    : licencias;
  return (
    <div className='w-full h-screen bg-[url("https://firebasestorage.googleapis.com/v0/b/validacion-de-licencias-c813d.appspot.com/o/pngtree-abstract-white-and-light-gray-wave-modern-soft-luxury-texture-with-image_1379862.jpg?alt=media&token=083e0548-05a8-404f-8bb9-6ac6703d270c")] bg-no-repeat bg-cover'>
    <div className='w-full lg:h-20 h-[5vh] flex justify-center items-center'>
      <p className='lg:text-2xl text-[1.15rem]'>Administra tus licencias</p>
    </div>
    <div className='w-full h-auto'>
      <div className='lg:h-20 h-[10vh] w-full flex justify-center items-center gap-4'>
        <input
          className='px-2 lg:py-1 lg:w-1/3 w-[60%] py-[0.1px] placeholder:text-[0.85rem] border border-[black] rounded-[5px]'
          type='text'
          placeholder='Busca por nombre o folio'
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <svg class="lg:w-6 lg:h-6 w-4 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
</svg>
      </div>
      <div className='w-full h-auto flex justify-center'>
        <table className='w-full'>
          <thead className=''>
            <tr className=''>
              <th className='text-center px-[1rem] bg-gray-200 text-[0.5rem] lg:text-[1rem]'>NOMBRE</th>
              <th className='text-center px-[1rem] bg-gray-200 text-[0.5rem] lg:text-[1rem]'>FOLIO</th>
              <th className='text-center px-[1rem] bg-gray-200 text-[0.5rem] lg:text-[1rem]'>ESTADO</th>
              <th className='text-center px-[1rem] bg-gray-200 text-[0.5rem] lg:text-[1rem]'>VER/ELIMINAR</th>
              </tr>
          </thead>
          <tbody>
          {filteredLicencias?.length === 0 ? (
              <tr>
                <td colSpan={4} className='text-center px-[1rem] py-4 bg-gray-100'>
                  <p className='lg:text-[1rem] text-[0.8rem]'>
                    No se han encontrado licencias asociadas a este usuario.
                  </p>
                </td>
              </tr>
            ) : (
              filteredLicencias?.map((licencia) => (
                <tr  key={licencia._id}>
                  <td className='text-center px-[1rem] bg-gray-100 text-[0.5rem] lg:text-[1rem]'>{licencia.nombre}</td>
                  <td className='text-center px-[1rem] bg-gray-100 text-[0.5rem] lg:text-[1rem]'>{licencia.folio}</td>
                  <td className='text-center px-[1rem] bg-gray-100 text-[0.5rem] lg:text-[1rem]'>{licencia.estado_id.nombre}</td>
                  <td className='justify-center px-[1rem] flex lg:gap-5 gap-1 bg-gray-100 '>
                  <Anchor className='flex ' to={`/validacion/${removeSpacesAndAccents(licencia.estado_id.nombre)}/${licencia.folio}`}>
                  <button className=''>
                  <svg class="lg:w-6 h-6 w-[0.8rem] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 14">
                  <g stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
                  <path d="M10 10a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/>
                  <path d="M10 13c4.97 0 9-2.686 9-6s-4.03-6-9-6-9 2.686-9 6 4.03 6 9 6Z"/>
                  </g>
                  </svg>
                  </button>
                  </Anchor>
                 <button className='hover:bg-[#b63232] p-[0.3rem] rounded-[5px] '  onClick={() => handleFolioClick(licencia.folio)} >
                  <svg  class="lg:w-6 h-6 w-[0.8rem] text-gray-800 dark:text-white hover:text-[white]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h16M7 8v8m4-8v8M7 1h4a1 1 0 0 1 1 1v3H6V2a1 1 0 0 1 1-1ZM3 5h12v13a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5Z"/>
                  </svg>
                  </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        </div>
      <div className='w-full h-[6vh] flex justify-center gap-5 items-center'>
      <button onClick={handlePrev}
        disabled={licencia?.prevPage === null} className='bg-[#1db9b9] text-white p-1 rounded-[10px] disabled:bg-[gray]'>Anterior</button>
      <p>Página: {currentPage}</p>
      <button onClick={handleNext}
          disabled={ licencia?.nextPage === null} className='bg-[#1db9b9] text-white p-1 rounded-[10px] disabled:bg-[gray]'>Siguiente</button>
        </div>
    </div>
  </div>
);
}
