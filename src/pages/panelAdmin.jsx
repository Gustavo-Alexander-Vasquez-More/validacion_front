import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { Link as Anchor } from 'react-router-dom';
import CrearUsuarios from '../components/modales/crearUsuario.jsx';
import ControUsuarios from '../components/modales/controUsuarios.jsx';
import EliminaUsuario from '../components/modales/eliminaUsuario.jsx';
import AltaLicencias from '../components/modales/altaLicencias.jsx';
import AdminLicencias from '../components/modales/adminLicencias.jsx';
export default function panelAdmin() {
  const [mostrarModal, setMostrarModal]=useState(false)
  const [opcionSelect, setOpcionSelect]=useState(null)
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const superAdmin=localStorage.getItem('rol')
  useEffect(() => {
  const userToken = localStorage.getItem('token');
  
  if (!userToken) {
  navigate('/');
  }
  }, [navigate]);
 
function openModal(opcion){
  setOpcionSelect(opcion)
  setMostrarModal(true)
  }
  const token = localStorage.getItem('token');
  async function LogOut() {
    try {
      await axios.post('https://validacionback-production.up.railway.app/api/admins/logout', null, {
        headers: { Authorization: `Bearer ${token}` },
      });
  localStorage.removeItem('token');
      localStorage.removeItem('usuario');
      localStorage.removeItem('rol');
      localStorage.removeItem('folios')
  Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Hasta luego!',
        showConfirmButton: false,
        timer: 1500,
      });
  // Esperar un momento para que los datos se eliminen
      await new Promise(resolve => setTimeout(resolve, 1000)); // Puedes ajustar el tiempo según sea necesario
  navigate('/');
  
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'No se cerro la sesion correctamente',
        timer: 1500,
      });
    }
  };

  const [menu, setMenu] = useState(false);
  function openMenu() {
    setMenu(true);
  }
  function closeMenu() {
    setMenu(false);
  }
  const usuario=localStorage.getItem('usuario')
return (
  <div className='w-full h-auto bg-[#e4e4e4] '>
    <div className={`absolute bg-[#e4e4e4] w-[60%] sm:w-[40%] lg:w-[30%] h-full py-[2rem] px-[2rem] flex flex-col gap-10 z-30 items-start transition-transform ${menu ? 'translate-x-0' : '-translate-x-full'}`}>
        <Anchor onClick={closeMenu}>
        <svg className="w-6 h-6 text-[black] hover:animate-spin" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
        </svg>
        </Anchor>
        <div  className='w-full h-auto bg-[url("https://firebasestorage.googleapis.com/v0/b/validacion-de-licencias-c813d.appspot.com/o/fondito.jpg?alt=media&token=f5e3b3b3-fbfb-4b19-9f90-a0eab1ab5504")]'>
        <p className='sm:text-[1.5rem] text-center font-bold text-[1rem]'>Bienvenido {usuario}</p>
        </div>
        {superAdmin === '1' ? (
          <>
          <button onClick={()=>openModal('opcion1')} className='text-[0.8rem] py-[0.5rem] sm:w-[90%] sm:text-[0.8rem] sm:py-[0.5rem]  lg:w-[80%] lg:h-[2.5rem] bg-[#333333] text-white rounded-[5px] hover:bg-[#5353a0] w-full'>Crear usuarios</button>
          <button onClick={()=>openModal('opcion2')} className='text-[0.8rem] py-[0.5rem] sm:w-[90%] sm:text-[0.8rem] lg:w-[80%] sm:py-[0.5rem] lg:h-[2.5rem] bg-[#333333] text-white rounded-[5px] hover:bg-[#5353a0]  w-full'>Asignacion folios</button>
          <button onClick={()=>openModal('opcion3')} className='text-[0.8rem] py-[0.5rem] sm:w-[90%] sm:text-[0.8rem] lg:w-[80%] sm:py-[0.5rem] lg:h-[2.5rem] bg-[#333333] text-white rounded-[5px] hover:bg-[#5353a0]  w-full'>Eliminar usuario</button>
          <button onClick={()=>openModal('opcion4')} className='text-[0.8rem] py-[0.5rem] sm:w-[90%] sm:text-[0.8rem] lg:w-[80%] sm:py-[0.5rem] lg:h-[2.5rem] bg-[#333333] text-white rounded-[5px] hover:bg-[#5353a0]  w-full'>Subir licencias</button>
          <button onClick={()=>openModal('opcion5')} className='text-[0.8rem] py-[0.5rem] sm:w-[90%] sm:text-[0.8rem] lg:w-[80%] h-[2.5rem] bg-[#333333] text-white rounded-[5px] hover:bg-[#5353a0]  w-full'>Administrar licencias</button>
          <Anchor className='text-[0.8rem] py-[0.5rem] sm:w-[90%] sm:text-[0.8rem] lg:w-[80%] sm:py-[0.5rem] lg:h-[2.5rem] bg-[#333333] text-white rounded-[5px] hover:bg-[#5353a0]  w-full' to='https://firebasestorage.googleapis.com/v0/b/validacion-de-licencias-c813d.appspot.com/o/QRS-Mercurio.zip?alt=media&token=8cfb8e08-b030-45cf-900d-eabd19bf740f'><p className='text-center  '>Descarga los QR</p></Anchor>
          <button onClick={LogOut} className='text-[0.8rem] sm:text-[0.8rem]  sm:w-[90%] lg:w-[80%] py-[0.5rem] bg-[#333333] text-white rounded-[5px] hover:bg-[#5353a0]  w-full'>Cerrar sesión</button>
          </>
        ):
        <>
        <button onClick={()=>openModal('opcion4')} className='text-[0.8rem] py-[0.5rem] sm:w-[90%] sm:text-[0.8rem] lg:w-[80%] h-[2.5rem] bg-[#333333] text-white rounded-[5px] hover:bg-[#5353a0] w-full'>Subir licencias</button>
        <button onClick={()=>openModal('opcion5')} className='text-[0.8rem] py-[0.5rem] sm:w-[90%] sm:text-[0.8rem] lg:w-[80%] h-[2.5rem] bg-[#333333] text-white rounded-[5px] hover:bg-[#5353a0] w-full'>Administrar licencias</button>
        <Anchor className='text-[0.8rem] py-[0.5rem] sm:w-[90%] sm:text-[0.8rem] lg:w-[80%] sm:py-[0.5rem] lg:h-[2.5rem] bg-[#333333] text-white rounded-[5px] hover:bg-[#5353a0] w-full' to='https://firebasestorage.googleapis.com/v0/b/validacion-de-licencias-c813d.appspot.com/o/QRS-Mercurio.zip?alt=media&token=8cfb8e08-b030-45cf-900d-eabd19bf740f'><p className='text-center'>Descarga los QR</p></Anchor>
        <button onClick={LogOut} className='py-[0.5rem] text-[0.8rem] sm:text-[0.8rem] sm:w-[90%] lg:w-[80%]  bg-[#333333] text-white rounded-[5px] hover:bg-[#5353a0] w-full'>Cerrar sesión</button>
        </>
        }
        </div>
  <div className="w-full h-[10vh] bg-[#e4e4e4] flex items-center justify-between relative px-[2rem]   ">
    <Anchor className="" onClick={openMenu}>
      <svg
        className="w-7 h-7 text-gray-800 dark:text-white"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 17 14"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M1 1h15M1 7h15M1 13h15"
        />
      </svg>
    </Anchor>

  

    <p className="text-[black] lg:text-[3rem] font-thin sm:text-[2.5rem] w-[100%] text-center">
      Panel de Administrador
    </p>
    <img className='lg:w-[4rem] w-[2.5rem]' src="https://firebasestorage.googleapis.com/v0/b/validacion-de-licencias-c813d.appspot.com/o/Opera_Captura_de_pantalla_2023-09-14_152118_www.google.com-removebg-preview.png?alt=media&token=62d36514-e887-4017-aebc-507d5e1ebcf1" alt="" />
  </div>
{mostrarModal && (
      <>
      {opcionSelect === 'opcion1' && (
        <CrearUsuarios/>
        )}
        {opcionSelect === 'opcion2' && (
        <ControUsuarios/>
        )}
        {opcionSelect === 'opcion3' && (
        <EliminaUsuario/>
        )}
        {opcionSelect === 'opcion4' && (
        <AltaLicencias/>
        )}
        {opcionSelect === 'opcion5' && (
         <AdminLicencias/>
        )}
      </>
      
    )
}
</div>
);
}
