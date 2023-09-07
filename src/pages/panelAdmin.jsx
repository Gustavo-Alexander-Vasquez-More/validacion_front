import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import estadosActions from '../redux/actions/estados.js';
import {subirArchivos} from '../firebase/config.js'
import adminActions from '../redux/actions/admins.js'
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function panelAdmin() {
const [mostrarModal, setMostrarModal]=useState(false)
const [opcionSelect, setOpcionSelect]=useState(null)
const [file, setFile]=useState(null)
const [passwordValue, setPasswordValue]=useState('')
const [usuarioValue, setUsuarioValue]=useState('')
const [folioValue, setFolioValue]=useState('')
const [rolValue, setRolValue]=useState('')
const [selectUser, setSelectUser]=useState('')
const navigate=useNavigate()
const inputPassword=useRef()
const inputUsuario=useRef()
const inputFolio=useRef()
const inputRol=useRef()
const inputSelectUser=useRef()
useEffect(() => {
  dispatch(adminActions.read_admins())
 }, []);
 
const admins=useSelector((store)=>store.admins.admins)
console.log(admins);
const dispatch=useDispatch()
useEffect(() => {
dispatch(estadosActions.read_estados())
}, []);
const datos=useSelector((store)=>store.estados.estados)
console.log(datos);
function openModal(opcion){
setOpcionSelect(opcion)
setMostrarModal(true)
}
function closeModal(){
setMostrarModal(false)
}
const subir=async(e)=>{
    try {
     const result=await subirArchivos(file)
     console.log(result);  
    } catch (error) {
    console.log(error); 
    }
}
async function crearUsuario(){
try {
  const datos={
    usuario:usuarioValue,
    contraseña:passwordValue,
    rol:rolValue,
    folios:folioValue
    } 
    dispatch(adminActions.create_admins(datos))
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Registro exitoso',
      showConfirmButton: false,
      timer: 1500
    })
      
}  catch (error) {
  Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'No se pudo registrar!',
  })
}
}
function captureUsuario(){
setUsuarioValue(inputUsuario.current.value)
}
function capturePassword(){
setPasswordValue(inputPassword.current.value)
}
function captureFolio(){
setFolioValue(inputFolio.current.value)
}
function captureRol(){
setRolValue(inputRol.current.value)
}

const token = localStorage.getItem('token');

  const rol = localStorage.getItem('rol');

  const usuario = localStorage.getItem('usuario');
async function LogOut() {
  try {
    await axios.post('http://localhost:8084/api/admins/logout', null, {
      headers: { Authorization: `Bearer ${token}` },
    });

    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    localStorage.removeItem('rol');

    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Sesión cerrada',
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
const adminFiltered=admins.filter(admin=>admin.rol === 2)
console.log(adminFiltered);
function captureSelect(){
setSelectUser(inputSelectUser.current.value)
}
async function deleteUser(){
try {
  const datos={
    usuario:selectUser
  }
  await dispatch(adminActions.delete_admins(datos))
} catch (error) {
  
}
}
  return (
    <div className='w-full h-auto'>
      <div className='w-full h-[10vh] bg-[#0000ff9a] text-center'>
        <p className='text-[white] text-[3rem] font-thin '>Panel de Administrador</p>
      </div>
      <div className='w-full h-auto bg-[#0000ff9a] flex'>
        <div className='w-[28%] h-auto bg-[#6363b39a] py-[5rem] px-[2rem] flex flex-col gap-[3rem] '>
            <button onClick={()=>openModal('opcion1')} className='w-[80%] h-[2.5rem] bg-[blue] text-white rounded-[5px] hover:bg-[#5353a0]'>Crear usuarios</button>
            <button onClick={()=>openModal('opcion2')} className='w-[80%] h-[2.5rem] bg-[blue] text-white rounded-[5px] hover:bg-[#5353a0]'>Control de usuarios</button>
            <button onClick={()=>openModal('opcion3')} className='w-[80%] h-[2.5rem] bg-[blue] text-white rounded-[5px] hover:bg-[#5353a0]'>Eliminar usuario</button>
            <button onClick={()=>openModal('opcion4')} className='w-[80%] h-[2.5rem] bg-[blue] text-white rounded-[5px] hover:bg-[#5353a0]'>Subir licencias</button>
            <button onClick={()=>openModal('opcion5')} className='w-[80%] h-[2.5rem] bg-[blue] text-white rounded-[5px] hover:bg-[#5353a0]'>Editar/Eliminar licencias</button>
            <button onClick={LogOut} className='w-[80%] h-[2.5rem] bg-[blue] text-white rounded-[5px] hover:bg-[#5353a0]'>Cerrar sesión</button>
        </div>
        <div className='w-[70%] h-auto flex'>
        
        {mostrarModal && (
        <div className='w-full h-auto bg-[#7d7dce9a] flex justify-center items-center py-[2rem]'>
          
            {opcionSelect === 'opcion1' && (
              <div className='w-[80%] bg-[white] h-auto rounded-[10px] border-solid border-[1px] border-[gray] flex flex-col justify-around items-center py-[2rem] gap-5'>
            <p className='text-[2rem]'>Crea un usuario Admin</p>
            <div className='flex flex-col px-[1rem] w-[60%] '>
            <p>Usuario:</p>
            <input ref={inputUsuario} onChange={captureUsuario} className='w-[99%]  border-solid border-[1px] border-[gray] rounded-[5px] px-[1rem] placeholder:px-[1rem] h-[2rem]' type="text" placeholder='Nombre de usuario' />
            </div>
            <div className='flex flex-col px-[1rem] w-[60%] '>
            <p>Contraseña:</p>
            <input onChange={capturePassword} ref={inputPassword} className='w-[99%]  border-solid border-[1px] border-[gray] rounded-[5px] px-[1rem] placeholder:px-[1rem] h-[2rem]' type="password" placeholder='Escriba la contraseña ' />
            </div>
            <div className='flex flex-col px-[1rem] w-[60%] '>
            <p>Rol de usuario:</p>
            <input onChange={captureRol} ref={inputRol} className='w-[99%]  border-solid border-[1px] border-[gray] rounded-[5px] px-[1rem] placeholder:px-[1rem] h-[2rem]' type="number" placeholder='Rol 1=Super admin , Rol 2=Admin común ' />
            </div>
            <div className='flex flex-col px-[1rem] w-[60%] '>
            <p>N° de folios:</p>
            <input onChange={captureFolio} ref={inputFolio} className='w-[99%]  border-solid border-[1px] border-[gray] rounded-[5px] px-[1rem] placeholder:px-[1rem] h-[2rem]' type="number" placeholder='¿Con cuantos folios empieza?' />
            </div>
            <button onClick={crearUsuario} className='bg-[blue] w-[45%] h-[2.5rem] text-[white] rounded-[10px] hover:bg-[#5353a0]'>Crear usuario</button>
            </div>
            )}
            {opcionSelect === 'opcion2' && (
            
            <div className='w-[80%] bg-[white] h-auto rounded-[10px] border-solid border-[1px] border-[gray] flex flex-col justify-around items-center py-[2rem] gap-5'>
            <p className='text-[2rem]'>Panel de usuarios</p>
            {adminFiltered.map(admin=>(
            <div className='w-[90%] h-[8vh] bg-[black] flex items-center justify-around rounded-[5px]'>
            <p className='text-[white]' >Usuario:</p>
            <p className='text-[white]'>{admin.usuario}</p>
            <input  className='w-[15%]  px-[1rem] py-[0.3rem] rounded-[5px]' type="number" placeholder='N° folios'/>
            <button className='bg-[green] text-[white] px-[1rem] py-[0.3rem] rounded-[10px] hover:bg-[#53a05d]'>Guardar</button>
            </div>
            ))}
            </div>
            )}
            {opcionSelect === 'opcion3' && (
              <div className='w-[80%] bg-[white] h-auto rounded-[10px] border-solid border-[1px] border-[gray] flex flex-col justify-around items-center py-[2rem] gap-5'>
            <p className='text-[2rem]'>Elimina un usuario</p>
            <select onSelect={captureSelect} ref={inputSelectUser} className='w-[70%]  border-solid border-[1px] border-[gray] rounded-[5px] px-[1rem] placeholder:px-[1rem] h-[2.1rem]' name="" id="">
                <option value="">Selecciona el usuario que quieres eliminar</option>
                {admins.map(admin=>(
                  <option value="">{admin.usuario}</option>
            ))}
            </select>
            <button onClick={deleteUser} className='bg-[red] w-[70%] h-[2.5rem] text-[white] rounded-[10px] hover:bg-[#a05353]'>Eliminar admin</button>
            </div>
            )}
            {opcionSelect === 'opcion4' && (
              <div className='w-[80%] bg-[white] h-auto rounded-[10px] border-solid border-[1px] border-[gray] flex flex-col justify-around items-center py-[1rem] gap-4'>
            <p className='text-[2rem]'>Alta de licencias</p>
            <div className='flex flex-col px-[1rem] w-[60%]'>
            <p>Foto:</p>
            <input className='w-[99%]  border-solid border-[1px] border-[gray] rounded-[5px]' type="file" placeholder='Foto' onChange={e=> subir(e.target.files[0])} />
            </div>
            <div className='flex flex-col px-[1rem] w-[60%]'>
            <p>NOMBRE COMPLETO</p>
            <input className='w-[99%]  border-solid border-[1px] border-[gray] rounded-[5px] px-[1rem] placeholder:px-[1rem] h-[2rem]' type="text"  />
            </div>
            <div className='flex flex-col px-[1rem] w-[60%]'>
            <p>FOLIO / TIPO</p>
            <input className='w-[99%]  border-solid border-[1px] border-[gray] rounded-[5px] px-[1rem] placeholder:px-[1rem] h-[2rem]' type="text" />
            </div>
            <div className='flex flex-col px-[1rem] w-[60%]'>
            <p>RFC / CURP</p>
            <input className='w-[99%]  border-solid border-[1px] border-[gray] rounded-[5px] px-[1rem] placeholder:px-[1rem] h-[2rem]' type="text"/>
            </div>
            <div className='flex flex-col px-[1rem] w-[60%]'>
            <p>FECHA DE EXPEDICIÓN</p>
            <input className='w-[99%]  border-solid border-[1px] border-[gray] rounded-[5px] px-[1rem] placeholder:px-[1rem] h-[2rem]' type="text"  />
            </div>
            <div className='flex flex-col px-[1rem] w-[60%]'>
            <p>VIGENCIA</p>
            <input className='w-[99%]  border-solid border-[1px] border-[gray] rounded-[5px] px-[1rem] placeholder:px-[1rem] h-[2rem]' type="text"  />
            </div>
            
            <div  className='flex flex-col px-[1rem] w-[60%]'>
            <p>Estado al que pertenece:</p>
            <select className='w-[99%]  border-solid border-[1px] border-[gray] rounded-[5px] px-[1rem] placeholder:px-[1rem] h-[2.1rem]' name="" id="">
                <option value="">Selecciona el estado</option>
            {datos.map((estado)=>(
                <option key={estado._id} value="">{estado.nombre}</option>
            ))}
            </select>
            </div>
            <button className='bg-[green] w-[45%] h-[2.5rem] text-[white] rounded-[10px] hover:bg-[#53a05d]'>Subir licencia</button>
            
            </div>
            )}
            {opcionSelect === 'opcion5' && (
             <div className='w-[80%] bg-[white] h-auto rounded-[10px] border-solid border-[1px] border-[gray] flex flex-col justify-around items-center py-[2rem] gap-5'>
             <p className='text-[2rem]'>Edita o elimina una licencia de cliente</p>
             <select className='w-[70%]  border-solid border-[1px] border-[gray] rounded-[5px] px-[1rem] placeholder:px-[1rem] h-[2.1rem]' name="" id="">
                 <option value="">Selecciona el cliente que quieres editar o eliminar</option>
             </select>
             <select className='w-[70%]  border-solid border-[1px] border-[gray] rounded-[5px] px-[1rem] placeholder:px-[1rem] h-[2.1rem]' name="" id="">
                 <option value="">Tipo de dato a Editar</option>
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
      </div>
    </div>
  );
}
