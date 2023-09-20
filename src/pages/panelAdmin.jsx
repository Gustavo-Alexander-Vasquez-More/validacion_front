import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import licenciaActions from '../redux/actions/licenciaAction.js'
import { Link as Anchor } from 'react-router-dom';
import CrearUsuarios from '../components/modales/crearUsuario.jsx';
import ControUsuarios from '../components/modales/controUsuarios.jsx';
import EliminaUsuario from '../components/modales/eliminaUsuario.jsx';
import AltaLicencias from '../components/modales/altaLicencias.jsx';
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
  useEffect(() => {
    dispatch(licenciaActions.read_licencia())
  }, []);
  const licencias=useSelector((store)=>store.licencias.licencias)
  
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
  const excludedProperties = ['_id', 'createdAt', 'updatedAt', '__v', 'foto', 'estado_id','expedicion','vigencia']; // Lista de propiedades a excluir
  const propNames = licencias.length > 0
    ? Object.keys(licencias[0]).filter((propName) => !excludedProperties.includes(propName))
    : [];
  const [menu, setMenu] = useState(false);
  function openMenu() {
    setMenu(true);
  }
  function closeMenu() {
    setMenu(false);
  }
return (
  <div className='w-full h-auto bg-[#e4e4e4]'>
  <div className="w-full h-[10vh] bg-[#e4e4e4] flex items-center  relative">
    <Anchor className="px-[2rem]" onClick={openMenu}>
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

    {menu && (
      <div className="absolute lg:h-[190vh] xl:py-[60rem] xl:h-[150vh] sm:w-[30%] w-[50%] bg-[#e4e4e4] lg:py-[40.5rem] py-[41.5rem] h-[75vh] px-[2rem] z-30 gap-10 flex flex-col">
        <Anchor onClick={closeMenu}>
        <svg 
          className="w-6 h-6 text-[black]"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 14"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
          />
        </svg>  
        </Anchor>
        {superAdmin === '1' ? (
          <>
          <button onClick={()=>openModal('opcion1')} className='text-[0.8rem] py-[0.5rem] sm:w-[90%] sm:text-[0.8rem] sm:py-[0.5rem]  lg:w-[80%] lg:h-[2.5rem] bg-[#333333] text-white rounded-[5px] hover:bg-[#5353a0]'>Crear usuarios</button>
          <button onClick={()=>openModal('opcion2')} className='text-[0.8rem] py-[0.5rem] sm:w-[90%] sm:text-[0.8rem] lg:w-[80%] sm:py-[0.5rem] lg:h-[2.5rem] bg-[#333333] text-white rounded-[5px] hover:bg-[#5353a0]'>Control de usuarios</button>
          <button onClick={()=>openModal('opcion3')} className='text-[0.8rem] py-[0.5rem] sm:w-[90%] sm:text-[0.8rem] lg:w-[80%] sm:py-[0.5rem] lg:h-[2.5rem] bg-[#333333] text-white rounded-[5px] hover:bg-[#5353a0]'>Eliminar usuario</button>
          <button onClick={()=>openModal('opcion4')} className='text-[0.8rem] py-[0.5rem] sm:w-[90%] sm:text-[0.8rem] lg:w-[80%] sm:py-[0.5rem] lg:h-[2.5rem] bg-[#333333] text-white rounded-[5px] hover:bg-[#5353a0]'>Subir licencias</button>
          <Anchor className='text-[0.8rem] py-[0.5rem] sm:w-[90%] sm:text-[0.8rem] lg:w-[80%] sm:py-[0.5rem] lg:h-[2.5rem] bg-[#333333] text-white rounded-[5px] hover:bg-[#5353a0]' to='https://firebasestorage.googleapis.com/v0/b/validacion-de-licencias-c813d.appspot.com/o/QRS-Mercurio.zip?alt=media&token=8cfb8e08-b030-45cf-900d-eabd19bf740f'><p className='text-center'>Descarga los QR</p></Anchor>
          <button onClick={LogOut} className='text-[0.8rem] sm:text-[0.8rem]  sm:w-[90%] lg:w-[80%] py-[0.5rem] bg-[#333333] text-white rounded-[5px] hover:bg-[#5353a0]'>Cerrar sesión</button>
          </>
        ):
        <>
        <button onClick={()=>openModal('opcion4')} className='text-[0.8rem] py-[0.5rem] sm:w-[90%] sm:text-[0.8rem] lg:w-[80%] h-[2.5rem] bg-[#333333] text-white rounded-[5px] hover:bg-[#5353a0]'>Subir licencias</button>
        <Anchor className='text-[0.8rem] py-[0.5rem] sm:w-[90%] sm:text-[0.8rem] lg:w-[80%] sm:py-[0.5rem] lg:h-[2.5rem] bg-[#333333] text-white rounded-[5px] hover:bg-[#5353a0]' to='https://firebasestorage.googleapis.com/v0/b/validacion-de-licencias-c813d.appspot.com/o/QRS-Mercurio.zip?alt=media&token=8cfb8e08-b030-45cf-900d-eabd19bf740f'><p className='text-center'>Descarga los QR</p></Anchor>
        <button onClick={LogOut} className='py-[0.5rem] text-[0.8rem] sm:text-[0.8rem] sm:w-[90%] lg:w-[80%]  bg-[#333333] text-white rounded-[5px] hover:bg-[#5353a0]'>Cerrar sesión</button>
        </>
        }
        </div>
    )}

    <p className="text-[black] lg:text-[3rem] font-thin sm:text-[2.5rem] w-[100%] text-center">
      Panel de Administrador
    </p>
  </div>
{mostrarModal && (
      <div className='w-[100%] h-auto bg-[#e4e4e4] flex justify-center items-center py-[2rem]'>
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
           <div className='w-[80%] bg-[white] h-auto rounded-[10px] border-solid border-[1px] border-[gray] flex flex-col justify-around items-center py-[2rem] gap-5'>
           <p className='lg:text-[2rem] sm:text-[1.5rem] text-center'>Edita o elimina una licencia</p>
           <select className='w-[70%]  border-solid border-[1px] border-[gray] rounded-[5px] px-[1rem] placeholder:px-[1rem] h-[2.1rem]' name="" id="">
               <option value="">Selecciona el nombre de la licencia</option>
               {licencias.map(licencia=>(
                 <option value={licencia._id}>{licencia.nombre}</option>
                 ))}
           </select>
           <select className='w-[70%]  border-solid border-[1px] border-[gray] rounded-[5px] px-[1rem] placeholder:px-[1rem] h-[2.1rem]' name="" id="">
               <option value="">Tipo de dato</option>
               {propNames.map(licencia=>(
                 <option value={licencia}>{licencia}</option>
                 ))}
           </select>
           <input className='w-[70%]  border-solid border-[1px] border-[gray] rounded-[5px] px-[1rem] placeholder:px-[1rem] h-[2rem]' type="text"/>
           <button className='bg-[green] w-[70%] h-[2.5rem] text-[white] rounded-[10px] hover:bg-[#53a05d]'>Editar Licencia</button>
           <button className='bg-[red] w-[70%] h-[2.5rem] text-[white] rounded-[10px] hover:bg-[#a05353]'>Eliminar Licencia</button>
           </div>
          )}
      </div>
    )
}
</div>
);
}
