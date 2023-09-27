import React, { useEffect, useRef, useState } from 'react';
import adminActions from '../../redux/actions/admins.js';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';

export default function eliminaUsuario() {
  const [selectUser, setSelectUser] = useState('');
  const dispatch = useDispatch();
  const inputSelectUser = useRef();
  
  const admins = useSelector((store) => store.admins.admins);
  
  useEffect(() => {
    dispatch(adminActions.read_admins());
  }, [dispatch]);

  async function deleteUser() {
    try {
      const datitos = {
        usuario: selectUser,
      };

      if (datitos.usuario) {
        const confirmation = await Swal.fire({
          title: `¿Estás seguro de que deseas eliminar el usuario ${selectUser} ?`,
          showDenyButton: true,
          showCancelButton: true,
          confirmButtonText: 'Sí',
          denyButtonText: 'No',
        });
  
        if (confirmation.isConfirmed) {
          await dispatch(adminActions.delete_admins(datitos));
          
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Usuario eliminado',
            showConfirmButton: dispatch(adminActions.read_admins()),
            timer: 1500,
          });
      
      } }else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'No se eliminó',
          timer: 1500,
        });
      }
    } catch (error) {
      console.log('Error al eliminar usuario:', error);
    }
  }

  function captureSelect() {
    setSelectUser(inputSelectUser.current.value.trim());
  }

  return (
    <div className='bg-[url("https://firebasestorage.googleapis.com/v0/b/validacion-de-licencias-c813d.appspot.com/o/pngtree-abstract-white-and-light-gray-wave-modern-soft-luxury-texture-with-image_1379862.jpg?alt=media&token=083e0548-05a8-404f-8bb9-6ac6703d270c")] bg-no-repeat bg-cover w-full h-screen flex justify-center py-[5rem]'>
      <div className='lg:w-[40%] sm:w-[60%] w-[95%] bg-[white] h-[30vh] rounded-[10px] border-solid border-[1px] border-[gray] flex flex-col justify-around items-center py-[2rem] gap-5'>
        <p className='text-[2rem]'>Elimina un usuario</p>
        <select
          onChange={captureSelect}
          ref={inputSelectUser}
          value={selectUser}
          className='w-[90%] border-solid border-[1px] border-[gray] rounded-[5px] px-[1rem] placeholder:px-[0.8rem] h-[2.1rem]'
          
        >
          <option value=''>Selecciona el usuario</option>
          {admins?.map((admin) => (
              <option key={admin._id} value={admin.usuario}>
                {admin.usuario}
              </option>
            ))}
        </select>
        <button onClick={deleteUser} className='bg-[red] w-[40%] h-[2.5rem] text-[white] rounded-[10px] hover:bg-[#a05353]'>
          Eliminar
        </button>
      </div>
    </div>
  );
}
