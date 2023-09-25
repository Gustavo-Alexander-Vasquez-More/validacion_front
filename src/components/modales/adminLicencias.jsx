import React, { useEffect, useState } from 'react';
import licenciaActions from '../../redux/actions/licenciaAction.js';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import EditarLicencia from './editarLicencia.jsx';
import { Link as Anchor } from 'react-router-dom';
export default function AdminLicencias() {
  const MAX_DISPLAYED_LICENCES = 5;
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');
  const [folioValue, setFolioValue]=useState('')
  const [mostrarModal, setMostrarModal]=useState(false)
  const [opcionSelect, setOpcionSelect]=useState(null)
  const user = localStorage.getItem('usuario');
  function openModal(opcion){
    setOpcionSelect(opcion)
    setMostrarModal(true)
    }
  const licencias = useSelector((store) => store.licencias.licencias);
  useEffect(() => {
    dispatch(licenciaActions.read_licencia());
  }, [dispatch, licencias]);


  async function deleteCliente(folio) {
    try {
      const dato = { folio };
      if (dato) {
        // Elimina la licencia
        await dispatch(licenciaActions.delete_licencia(dato));
  
        // Actualiza la lista de licencias en el estado local
         dispatch(licenciaActions.read_licencia());  // Esto debería actualizar la lista
  
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Cliente eliminado',
          showConfirmButton: false,
          timer: 1500,
        });
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

  function handleFolioLocal(folio){
  localStorage.setItem('folioEdit', folio);
  }

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };
 const Superadmin=localStorage.getItem('rol')
 let filteredLicencias = [];
 let displayedLicencias = [];
 
 if (Superadmin === '1') {
  
   filteredLicencias = licencias?.filter(
       (licencia) =>
         licencia.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
         licencia.folio.toLowerCase().includes(searchTerm.toLowerCase())
     )
     .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
     .slice(0, MAX_DISPLAYED_LICENCES);
 
   displayedLicencias = filteredLicencias;
 } else if (parseInt(Superadmin) > 1) {
   filteredLicencias = licencias
     .filter(
       (licencia) =>
         licencia.author_id &&
         licencia.author_id.usuario.toLowerCase() === user.toLowerCase() &&
         (licencia.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
           licencia.folio.toLowerCase().includes(searchTerm.toLowerCase()))
     )
     .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
     .slice(0, MAX_DISPLAYED_LICENCES);
 
   displayedLicencias = filteredLicencias;
 }
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
                <th className='text-center px-[1rem] bg-gray-200 text-[0.5rem] lg:text-[1rem]'>VER/EDITAR/ELIMINAR</th>
                </tr>
            </thead>
            <tbody>
            {displayedLicencias?.length === 0 ? (
                <tr>
                  <td colSpan={4} className='text-center px-[1rem] py-4 bg-gray-100'>
                    <p className='lg:text-[1rem] text-[0.8rem]'>
                      No se han encontrado licencias asociadas a este usuario.
                    </p>
                  </td>
                </tr>
              ) : (
                displayedLicencias?.map((licencia) => (
                  <tr key={licencia._id}>
                    <td className='text-center px-[1rem] bg-gray-100 text-[0.5rem] lg:text-[1rem]'>{licencia.nombre}</td>
                    <td className='text-center px-[1rem] bg-gray-100 text-[0.5rem] lg:text-[1rem]'>{licencia.folio}</td>
                    <td className='text-center px-[1rem] bg-gray-100 text-[0.5rem] lg:text-[1rem]'>{licencia.estado_id.nombre}</td>
                    <td className='justify-center px-[1rem] flex lg:gap-5 gap-1 bg-gray-100 '>
                    <Anchor to={`/validacion/${licencia.estado_id.nombre}/${licencia.folio}`}>
                    <button className=''>
                    <svg class="lg:w-6 h-6 w-[0.8rem] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 14">
                    <g stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
                    <path d="M10 10a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/>
                    <path d="M10 13c4.97 0 9-2.686 9-6s-4.03-6-9-6-9 2.686-9 6 4.03 6 9 6Z"/>
                    </g>
                    </svg>
                    </button>
                    </Anchor>
                    <button  onClick={() => {
    openModal('opcion1');
    handleFolioLocal(licencia.folio);
  }} className='hover:bg-[#32b632] p-[0.3rem] rounded-[5px] ' >
                    
                    <svg class="lg:w-6 h-6 w-[0.8rem] text-gray-800 dark:text-white hover:text-[white]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 21 21">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7.418 17.861 1 20l2.139-6.418m4.279 4.279 10.7-10.7a3.027 3.027 0 0 0-2.14-5.165c-.802 0-1.571.319-2.139.886l-10.7 10.7m4.279 4.279-4.279-4.279m2.139 2.14 7.844-7.844m-1.426-2.853 4.279 4.279"/>
                    </svg>
                    </button>
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
        <button className='bg-[#1db9b9] text-white p-1 rounded-[10px]'>Anterior</button>
        <p>{'1'}</p>
        <button className='bg-[#1db9b9] text-white p-1 rounded-[10px]'>Siguiente</button>
          </div>
        {mostrarModal && (
                      <>
                      <EditarLicencia/>
                      </>
                    )}
      </div>
    </div>
  );
}
