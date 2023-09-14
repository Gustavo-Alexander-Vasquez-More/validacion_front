import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import estadosActions from '../redux/actions/estados.js';
import adminActions from '../redux/actions/admins.js'
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import licenciaActions from '../redux/actions/licenciaAction.js'
import {uploadFile} from '../firebase/config.js'
export default function panelAdmin() {

const [mostrarModal, setMostrarModal]=useState(false)
const [opcionSelect, setOpcionSelect]=useState(null)
const [file, setFile]=useState(null)
console.log(file);
const [passwordValue, setPasswordValue]=useState('')
const [usuarioValue, setUsuarioValue]=useState('')
const [folioValue, setFolioValue]=useState('')
const [tipoValue, setTipoValue]=useState('')
const [rolValue, setRolValue]=useState('')
const [selectUser, setSelectUser]=useState('')
/*USESTATE PARA EL FORMULARIO DE LICENCIAS*/
const [fileValue, setFileValue]=useState('')
const [nombreValue, setNombreValue]=useState('')
const [folio_tipoValue, setFolio_tipoValue]=useState('')
const [rfcValue, setRfcValue]=useState('')
const [expedicionValue, setExpedicionValue]=useState('')
const [vigeniaValue, setVigenciaValue]=useState('')
const [estadoValue, setEstadoValue]=useState('')
const [userValue, setUserValue]=useState('')
const [addFolioValue, setAddFolioValue]=useState('')

/*-------------------------------------------------------------------------------------*/
const navigate=useNavigate()
useEffect(() => {
  const userToken = localStorage.getItem('token');
  if (!userToken) {
  navigate('/');
  }
}, [navigate]);
const inputPassword=useRef()
const inputUsuario=useRef()
const inputFolio=useRef()
const inputRol=useRef()
const inputSelectUser=useRef()
/*REF PARA FORM DE LICENCIA*/
const inputFoto=useRef()
const inputNombre=useRef()
const inputFolioForm=useRef()
const inputRfc=useRef()
const inputExpedicion=useRef()
const inputVigencia=useRef()
const inputEstado=useRef()
const userSelect=useRef()
const AgregarFolio=useRef()
const inputTipe=useRef()
/*DESPACHANDO ACCIONES----------------------------------------------------------------------*/
useEffect(() => {
  dispatch(adminActions.read_admins())
}, []);
const admins=useSelector((store)=>store.admins.admins)
const dispatch=useDispatch()
useEffect(() => {
dispatch(estadosActions.read_estados())
}, []);
useEffect(() => {
  dispatch(licenciaActions.read_licencia())
  }, []);
const datos=useSelector((store)=>store.estados.estados)
const licencias=useSelector((store)=>store.licencias.licencias)
console.log(licencias);


/*----------------------------------------------------------------------------------------------------------*/
/*CREACION DE MODAL------------------------------------------------------------------------------------------*/
function openModal(opcion){
setOpcionSelect(opcion)
setMostrarModal(true)
}
function closeModal(){
setMostrarModal(false)
}
/*-------------------------------------------------------------------------------------------------------------*/
/*FORMULARIO SUBA DE LICENCIAS*/

const handleFileChange = async (e) => {
  try {
    const selectedFile = e.target.files[0]; // Obtener el archivo seleccionado
    if (selectedFile) {
      const downloadURL = await uploadFile(selectedFile); // Subir el archivo y obtener la URL de descarga
      console.log('URL de descarga:', downloadURL);

      // Actualizar el estado 'file' con la URL de descarga
      setFile(downloadURL);
    }
  } catch (error) {
    console.error('Error al cargar el archivo:', error);
  }
};

function captureNombre(){
setNombreValue(inputNombre.current.value.trim())
}
function captureFolioForm(){
setFolio_tipoValue(inputFolioForm.current.value.trim())
}
function captureTipe(){
setTipoValue(inputTipe.current.value.trim())
}
function captureRfc(){
setRfcValue(inputRfc.current.value.trim())
}
function captureExpedicion() {
  const fechaSeleccionada = inputExpedicion.current.value; // Obten la fecha del input

  // Divide la fecha en sus partes (día, mes, año)
  const partesFecha = fechaSeleccionada.split('-');
  const dia = partesFecha[2];
  const mes = partesFecha[1];
  const año = partesFecha[0];
// Formatea la fecha como ISO 8601
  const fechaISO8601 = `${año}-${mes}-${dia}`;
// Almacena la fecha formateada en expedicionValue
  setExpedicionValue(fechaISO8601);
}
function captureVigencia(){
  const fechaSeleccionada = inputVigencia.current.value; 
  const partesFecha = fechaSeleccionada.split('-');
  const dia = partesFecha[2];
  const mes = partesFecha[1];
  const año = partesFecha[0];
  const fechaISO8601 = `${año}-${mes}-${dia}`;  
setVigenciaValue(fechaISO8601)
}
function captureEstado(){
setEstadoValue(inputEstado.current.value)
}
const cantidadDeFOlio=localStorage.getItem('folios')
console.log(cantidadDeFOlio);
async function subirLicencia() {
  try {
    if (nombreValue && folio_tipoValue && rfcValue && expedicionValue && vigeniaValue && estadoValue && file) {
      const formData = new FormData();

const data={
  nombre:nombreValue,
  folio:folio_tipoValue,
  tipo:tipoValue,
  rfc_curp:rfcValue,
  expedicion:expedicionValue,
  vigencia:vigeniaValue,
  estado_id:estadoValue,
  foto:file
}
      // Obtener el rol del usuario actual desde localStorage
      const rolUsuario = parseInt(localStorage.getItem('rol'));

      // Verificar si el usuario tiene rol 1 (rol con folios infinitos) o si hay folios disponibles antes de restar uno
      if (rolUsuario === 1 || (formData && cantidadDeFOlio > 0)) {
        // Restar uno a la cantidad actual de folios (solo si no tiene rol 1)
        if (rolUsuario !== 1) {
          const nuevaCantidadDeFolio = cantidadDeFOlio - 1;
          localStorage.setItem('folios', nuevaCantidadDeFolio.toString());
        }

        // Resto del código para enviar la licencia y actualizar el admin
        dispatch(licenciaActions.create_licencia(data));
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Licencia creada!',
          showConfirmButton: false,
          timer: 1500,
        });
        await window.location.reload();

        // Actualizar la cantidad de folios del admin (solo si no tiene rol 1)
        if (rolUsuario !== 1) {
          const nuevaCantidadDeFolio = cantidadDeFOlio - 1;
          const nombre = localStorage.getItem('usuario');
          const payload = {
            usuario: nombre,
            folios: nuevaCantidadDeFolio,
          };
          dispatch(adminActions.update_admins(payload));
        }
      } else {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Para seguir agregando licencias pide más folios!',
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Por favor, completa todos los campos.',
      });
    }
  } catch (error) {
    console.error(error); // Puedes agregar un mensaje de error más detallado si es necesario
  }
}

/*-----------------------------------------------------------------------------------------------------------*/
/*FUNCIONES PARA AGREGAR FOLIOS A UN USUARIO*/
/*CREAR USUARIOS---------------------------------------------------------------------------------------------*/
async function crearUsuario(){
try {
  const datos={
    usuario:usuarioValue,
    contraseña:passwordValue,
    rol:rolValue,
    folios:folioValue
    } 
    dispatch(adminActions.create_admins(datos))
    await window.location.reload()
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
setUsuarioValue(inputUsuario.current.value.trim())
}
function capturePassword(){
setPasswordValue(inputPassword.current.value.trim())
}
function captureFolio(){
setFolioValue(inputFolio.current.value.trim())
}
function captureRol(){
setRolValue(inputRol.current.value.trim())
}
const token = localStorage.getItem('token');
const rol = localStorage.getItem('rol');
const usuario = localStorage.getItem('usuario');
/*-----------------------------------------------------------------------------------------*/
/*DESLOGUEO DE USUARIOS*/
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
const adminFiltered = Array.isArray(admins) ? admins.filter(admin => admin.rol === 2) : [];
/*ELIMINAR USUARIOS----------------------------------------------------------*/
function captureSelect(){
setSelectUser(inputSelectUser.current.value.trim())
}
const datitos={
  usuario:selectUser
}
async function deleteUser(){
 
try {
if(datitos){
  dispatch(adminActions.delete_admins(datitos))
  await window.location.reload()
 Swal.fire({
    position: 'center',
    icon: 'success',
    title: 'usuario eliminado',
    showConfirmButton: false,
    timer: 1500,
  });
  
}else{
  Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: 'No se elimino',
    timer: 1500,
  });
}
 
 
} catch (error) {
  console.log(error);
  
}
}
function capturarUsuario(){
setUserValue(userSelect.current.value.trim())
}
function capturarValorFolios(){
setAddFolioValue(AgregarFolio.current.value.trim())
}

async function agregarMasFolios(){
try {
  const payload = {
    usuario: userValue,
    folios: addFolioValue,
  }
  dispatch(adminActions.update_admins(payload))
  Swal.fire({
     position: 'center',
     icon: 'success',
     title: 'Folios agregados con éxito',
     showConfirmButton: false,
     timer: 1500,
   });
  await window.location.reload()

} catch (error) {
}
}
const excludedProperties = ['_id', 'createdAt', 'updatedAt', '__v', 'foto', 'estado_id','expedicion','vigencia']; // Lista de propiedades a excluir

const propNames = licencias.length > 0
  ? Object.keys(licencias[0]).filter((propName) => !excludedProperties.includes(propName))
  : [];

const superAdmin=localStorage.getItem('rol')




  return (
    <div className='w-full h-auto'>
      <div className='w-full h-[10vh] bg-[#e4e4e4] text-center'>
        <p className='text-[black] lg:text-[3rem] font-thin sm:text-[2.5rem] '>Panel de Administrador</p>
      </div>
      <div className='w-full h-auto bg-[#e4e4e4] flex sm:flex-row flex-col'>
        <div className='sm:w-[28%] h-[50vh] sm:h-screen bg-[#e4e4e4] sm:py-[3rem] lg:py-[5rem] sm:px-[1rem] lg:px-[2rem] flex sm:flex-col sm:gap-[3rem] flex-wrap'>
          {superAdmin === '1' ? (
            <>
            <button onClick={()=>openModal('opcion1')} className='sm:w-[90%] sm:text-[0.8rem] sm:py-[0.5rem]  lg:w-[80%] lg:h-[2.5rem] bg-[#333333] text-white rounded-[5px] hover:bg-[#5353a0]'>Crear usuarios</button>
            <button onClick={()=>openModal('opcion2')} className='sm:w-[90%] sm:text-[0.8rem] lg:w-[80%] sm:py-[0.5rem] lg:h-[2.5rem] bg-[#333333] text-white rounded-[5px] hover:bg-[#5353a0]'>Control de usuarios</button>
            <button onClick={()=>openModal('opcion3')} className='sm:w-[90%] sm:text-[0.8rem] lg:w-[80%] sm:py-[0.5rem] lg:h-[2.5rem] bg-[#333333] text-white rounded-[5px] hover:bg-[#5353a0]'>Eliminar usuario</button>
            <button onClick={()=>openModal('opcion4')} className='sm:w-[90%] sm:text-[0.8rem] lg:w-[80%] sm:py-[0.5rem] lg:h-[2.5rem] bg-[#333333] text-white rounded-[5px] hover:bg-[#5353a0]'>Subir licencias</button>
            <button onClick={()=>openModal('opcion5')} className='sm:w-[90%] sm:text-[0.8rem] lg:w-[80%] sm:py-[0.5rem] lg:h-[2.5rem] bg-[#333333] text-white rounded-[5px] hover:bg-[#5353a0]'>Editar/Eliminar licencias</button>
            <button onClick={LogOut} className='sm:text-[0.8rem] sm:w-[90%] lg:w-[80%] h-[2.5rem] bg-[#333333] text-white rounded-[5px] hover:bg-[#5353a0]'>Cerrar sesión</button>
            </>
          ):
          <>
          <button onClick={()=>openModal('opcion4')} className='sm:w-[90%] sm:text-[0.8rem] lg:w-[80%] h-[2.5rem] bg-[#333333] text-white rounded-[5px] hover:bg-[#5353a0]'>Subir licencias</button>
          <button onClick={LogOut} className='sm:text-[0.8rem] sm:w-[90%] lg:w-[80%] h-[2.5rem] bg-[#333333] text-white rounded-[5px] hover:bg-[#5353a0]'>Cerrar sesión</button>
          </>
          }
           
            
        </div>
        <div className='w-[70%]  h-auto flex'>
        
        {mostrarModal && (
        <div className='w-full h-auto bg-[#e4e4e4] flex justify-center items-center py-[2rem]'>
          
            {opcionSelect === 'opcion1' && (
              <div className='lg:w-[80%] sm:w-full bg-[white] h-auto rounded-[10px] border-solid border-[1px] border-[gray] flex flex-col justify-around items-center lg:py-[2rem] sm:py-[0.6rem] sm:gap-4 lg:gap-5'>
            <p className='text-[2rem]'>Crea un usuario</p>
            <div className='flex flex-col lg:px-[1rem] sm:w-[85%] lg:w-[73%]'>
            <p>Usuario:</p>
            <input ref={inputUsuario} onChange={captureUsuario} className='w-[99%]  border-solid border-[1px] border-[gray] rounded-[5px] px-[1rem] placeholder:px-[0.1rem] h-[2rem]' type="text" placeholder='Nombre de usuario' />
            </div>
            <div className='flex flex-col lg:px-[1rem] sm:w-[85%] lg:w-[73%]'>
            <p>Contraseña:</p>
            <input onChange={capturePassword} ref={inputPassword} className='w-[99%]  border-solid border-[1px] border-[gray] rounded-[5px] px-[1rem] placeholder:px-[0.1rem] h-[2rem]' type="password" placeholder='Escriba la contraseña ' />
            </div>
            <div className='flex flex-col lg:px-[1rem] sm:w-[85%] lg:w-[73%]'>
            <p>Rol de usuario:</p>
            <p>Rol 1: Super-admin (Tiene acceso al panel completo)</p>
            <p>Rol 2: Admin común (Tiene restricciones en el panel)</p>
            <input onChange={captureRol} ref={inputRol} className='w-[99%]  border-solid border-[1px] border-[gray] rounded-[5px] px-[1rem] placeholder:px-[0.1rem] h-[2rem]' type="number" placeholder='Rol 1 o Rol 2' />
            </div>
            <div className='flex flex-col lg:px-[1rem] sm:w-[85%] lg:w-[73%]'>
            <p>N° de folios:</p>
            <input onChange={captureFolio} ref={inputFolio} className='w-[99%]  border-solid border-[1px] border-[gray] rounded-[5px] px-[1rem] placeholder:px-[0.1rem] h-[2rem]' type="number" placeholder='¿Con cuantos folios empieza?' />
            </div>
            <button onClick={crearUsuario} className='bg-[#333333] w-[45%] h-[2.5rem] text-[white] rounded-[10px] hover:bg-[#5353a0]'>Crear usuario</button>
            </div>
            )}
            {opcionSelect === 'opcion2' && (
            
            <div className='w-[90%] bg-[white] h-auto rounded-[10px] border-solid border-[1px] border-[gray] flex flex-col justify-around items-center py-[2rem] gap-5'>
            <p className='text-[2rem]'>Panel de usuarios</p>
            <p>(Agrega el numero de folios para un Admin)</p>
            <div className='w-[90%] h-[30vh] bg-[black] flex flex-col justify-around rounded-[5px] px-[1.5rem]'>
            <p className='text-[white]' >Usuario:</p>
            <select onChange={capturarUsuario} ref={userSelect} className='w-[15rem]'>
            <option value=''>Selecciona el admin</option>
            {adminFiltered.map(admin=>(
            <option value={admin.usuario}>{admin.usuario}</option>
            ))}
            </select>
            <input ref={AgregarFolio} onChange={capturarValorFolios}  className='lg:w-[30%] sm:w-[50%]  px-[1rem] py-[0.3rem] rounded-[5px]' type='number' placeholder='N° folios'/>
            <button onClick={agregarMasFolios} className='bg-[green] text-[white] px-[1rem] py-[0.3rem] rounded-[10px] hover:bg-[#53a05d]  w-[70%]'>Añadir cantidad de folios</button>
            </div>
            </div>
            )}
            {opcionSelect === 'opcion3' && (
            <div className='lg:w-[80%] sm:w-[90%] bg-[white] h-auto rounded-[10px] border-solid border-[1px] border-[gray] flex flex-col justify-around items-center py-[2rem] gap-5'>
            <p className='text-[2rem]'>Elimina un usuario</p>
            <select onChange={captureSelect} ref={inputSelectUser} className='w-[90%]  border-solid border-[1px] border-[gray] rounded-[5px] px-[1rem] placeholder:px-[0.8rem] h-[2.1rem]' name="" id="">
              <option  value="">Selecciona el usuario que quieres eliminar</option>
              {admins?.map(admin=>(
              <option key={admin._id} value={admin.usuario}>{admin.usuario}</option>
            ))}
            </select>
              <button onClick={deleteUser} className='bg-[red] w-[30%] h-[2.5rem] text-[white] rounded-[10px] hover:bg-[#a05353]'>Eliminar admin</button>
            </div>
            )}
            {opcionSelect === 'opcion4' && (
            <div className='w-[80%] bg-[white] h-auto rounded-[10px] border-solid border-[1px] border-[gray] flex flex-col justify-around items-center py-[1rem] gap-4'>
            <p className='sm:text-[1.5rem] font-semibold lg:text-[2rem]'>Alta de licencias </p>
            {superAdmin !=='1' && (
            <p>Cantidad de folios disponibles: {cantidadDeFOlio}</p>
            )}
            <div className='flex flex-col px-[1rem] sm:w-[80%] lg:w-[60%]'>
            <p className='sm:text-[0.9rem]'>FOTO</p>
            <input   ref={inputFoto}  className='w-[99%]  border-solid border-[1px] border-[gray] rounded-[5px]' type="file" placeholder='Foto' onChange={handleFileChange} />
            </div>
            <div className='flex flex-col px-[1rem] sm:w-[80%] lg:w-[60%]'>
            <p className='sm:text-[0.9rem]'>NOMBRE COMPLETO</p>
            <input onChange={captureNombre} ref={inputNombre} className='w-[99%]  border-solid border-[1px] border-[gray] rounded-[5px] px-[1rem] placeholder:px-[1rem] h-[2rem]' type="text"  />
            </div>
            <div className='flex flex-col px-[1rem] sm:w-[80%] lg:w-[60%]'>
            <p className='sm:text-[0.9rem]'>FOLIO</p>
            <input onChange={captureFolioForm} ref={inputFolioForm} className='w-[99%]  border-solid border-[1px] border-[gray] rounded-[5px] px-[1rem] placeholder:px-[1rem] h-[2rem]' type="text" />
            </div>
            <div className='flex flex-col px-[1rem] sm:w-[80%] lg:w-[60%]'>
            <p className='sm:text-[0.9rem]'>TIPO</p>
            <input onChange={captureTipe} ref={inputTipe} className='w-[99%]  border-solid border-[1px] border-[gray] rounded-[5px] px-[1rem] placeholder:px-[1rem] h-[2rem]' type="text" />
            </div>
            <div className='flex flex-col px-[1rem] sm:w-[80%] lg:w-[60%]'>
            <p className='sm:text-[0.9rem]'>RFC / CURP</p>
            <input onChange={captureRfc} ref={inputRfc} className='w-[99%]  border-solid border-[1px] border-[gray] rounded-[5px] px-[1rem] placeholder:px-[1rem] h-[2rem]' type="text"/>
            </div>
            <div className='flex flex-col px-[1rem] sm:w-[80%] lg:w-[60%]'>
            <p className='sm:text-[0.9rem]'>FECHA DE EXPEDICIÓN</p>
            <input onChange={captureExpedicion} ref={inputExpedicion} className='w-[99%]  border-solid border-[1px] border-[gray] rounded-[5px] px-[1rem] placeholder:px-[1rem] h-[2rem]' type="date"  />
            </div>
            <div className='flex flex-col px-[1rem] sm:w-[80%] lg:w-[60%]'>
            <p className='sm:text-[0.9rem]'>VIGENCIA</p>
            <input onChange={captureVigencia} ref={inputVigencia} className='w-[99%]  border-solid border-[1px] border-[gray] rounded-[5px] px-[1rem] placeholder:px-[1rem] h-[2rem]' type="date"  />
            </div>
            
            <div  className='flex flex-col px-[1rem] sm:w-[80%] lg:w-[60%]'>
            <p className='sm:text-[0.9rem]'>ESTADO</p>
            <select onChange={captureEstado} ref={inputEstado} className='w-[99%]  border-solid border-[1px] border-[gray] rounded-[5px] px-[1rem] placeholder:px-[1rem] h-[2.1rem]' name="" id="">
                <option value="">Selecciona el estado</option>
            {datos.map((estado)=>(
                <option key={estado._id} value={estado.nombre}>{estado.nombre}</option>
            ))}
            </select>
            </div>
            <button onClick={subirLicencia} className='bg-[green] w-[45%] h-[2.5rem] text-[white] rounded-[10px] hover:bg-[#53a05d]'>Subir licencia</button>
            
            </div>
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
</div>
</div>
);
}
