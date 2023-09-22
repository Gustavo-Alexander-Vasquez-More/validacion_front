import React, { useEffect, useState } from 'react';
import licenciaActions from '../../redux/actions/licenciaAction.js';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
export default function AdminLicencias() {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');
  const [folioValue, setFolioValue]=useState('')
  const user = localStorage.getItem('usuario');
  const licencias = useSelector((store) => store.licencias.licencias);
  async function deleteCliente(folio) {
    try {
      const dato = { folio };
      if (dato) {
        await dispatch(licenciaActions.delete_licencia(dato));
        window.location.reload()
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

console.log(folioValue);
  useEffect(() => {
    dispatch(licenciaActions.read_licencia());
  }, [dispatch]);

  const filteredLicencias = searchTerm
    ? licencias.filter(
        (licencia) =>
          licencia.author_id &&
          licencia.author_id.usuario.toLowerCase() === user.toLowerCase() &&
          (licencia.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
            licencia.folio.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    : [];

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };
 
  return (
    <div className='w-full h-screen bg-[url("https://firebasestorage.googleapis.com/v0/b/validacion-de-licencias-c813d.appspot.com/o/pngtree-abstract-white-and-light-gray-wave-modern-soft-luxury-texture-with-image_1379862.jpg?alt=media&token=083e0548-05a8-404f-8bb9-6ac6703d270c")] bg-no-repeat bg-cover'>
      <div className='w-full h-20 flex justify-center items-center'>
        <p className='text-2xl'>Administra tus licencias</p>
      </div>
      <div className='w-full h-auto'>
        <div className='h-20 w-full flex justify-center items-center gap-4'>
          <input
            className='px-2 py-1 w-1/3 border border-[black] rounded-[5px]'
            type='text'
            placeholder='Busca por nombre o número de folio'
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
  </svg>
        </div>
        <div className='w-full h-auto'>
          <table className='w-full'>
            <thead>
              <tr>
                <th className='py-2 bg-gray-200'>NOMBRE</th>
                <th className='py-2 bg-gray-200'>FOLIO</th>
                <th className='py-2 bg-gray-200'>TIPO</th>
                <th className='py-2 bg-gray-200'>ESTADO</th>
                <th className='py-2 bg-gray-200'>EDITAR/ELIMINAR</th>
                
              </tr>
            </thead>
            <tbody>
              {filteredLicencias.length === 0 ? (
                <tr>
                  <td colSpan={4} className='text-center py-4 bg-gray-100'>
                    No se han encontrado licencias asociadas a este usuario.
                  </td>
                </tr>
              ) : (
                filteredLicencias.map((licencia) => (
                  <tr key={licencia._id}>
                    <td className='py-2 text-center bg-gray-100'>{licencia.nombre}</td>
                    <td className='py-2 text-center bg-gray-100'>{licencia.folio}</td>
                    <td className='py-2 text-center bg-gray-100'>{licencia.tipo}</td>
                    <td className='py-2 text-center bg-gray-100'>{licencia.estado_id.nombre}</td>
                    <td className='py-2 flex justify-center gap-10 bg-gray-100 '>
                    <button className='hover:bg-[#32b632] p-[0.3rem] rounded-[5px]'>
                    <svg class="w-6 h-6 text-gray-800 dark:text-white hover:text-[white]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 21 21">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7.418 17.861 1 20l2.139-6.418m4.279 4.279 10.7-10.7a3.027 3.027 0 0 0-2.14-5.165c-.802 0-1.571.319-2.139.886l-10.7 10.7m4.279 4.279-4.279-4.279m2.139 2.14 7.844-7.844m-1.426-2.853 4.279 4.279"/>
                    </svg>
                    </button>
                     <button className='hover:bg-[#b63232] p-[0.3rem] rounded-[5px] '  onClick={() => handleFolioClick(licencia.folio)} >
                    <svg  class="w-6 h-6 text-gray-800 dark:text-white hover:text-[white]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
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
      </div>
    </div>
  );
}
