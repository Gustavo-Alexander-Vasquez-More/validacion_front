import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import estadosActions from '../redux/actions/estados.js';
import adminActions from '../redux/actions/admins.js'
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import licenciaActions from '../redux/actions/licenciaAction.js'
export default function panelAdmin() {
const [mostrarModal, setMostrarModal]=useState(false)
const [opcionSelect, setOpcionSelect]=useState(null)
const [file, setFile]=useState(null)
console.log(file);
const [passwordValue, setPasswordValue]=useState('')
const [usuarioValue, setUsuarioValue]=useState('')
const [folioValue, setFolioValue]=useState('')
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


function captureNombre(){
setNombreValue(inputNombre.current.value)
}
function captureFolioForm(){
setFolio_tipoValue(inputFolioForm.current.value)
}
function captureRfc(){
setRfcValue(inputRfc.current.value)
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
    if (nombreValue && folio_tipoValue && rfcValue && expedicionValue && vigeniaValue && estadoValue) {
      const formData = new FormData();

      // Agregar los campos uno por uno al formData
      formData.append('nombre', nombreValue);
      formData.append('folio_tipo', folio_tipoValue);
      formData.append('rfc_curp', rfcValue);
      formData.append('expedicion', expedicionValue);
      formData.append('vigencia', vigeniaValue);
      formData.append('estado_id', estadoValue);
      formData.append('foto', file);

      // Obtener la cantidad actual de folios
      const cantidadDeFOlio = parseInt(localStorage.getItem('folios'));

      // Verificar si hay folios disponibles antes de restar uno
      if (formData && cantidadDeFOlio > 0) {
        // Restar uno a la cantidad actual de folios
        const nuevaCantidadDeFolio = cantidadDeFOlio - 1;

        // Actualizar la cantidad de folios disponibles en el localStorage
        localStorage.setItem('folios', nuevaCantidadDeFolio.toString());

        // Resto del código para enviar la licencia y actualizar el admin
        dispatch(licenciaActions.create_licencia(formData));
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Licencia creada!',
          showConfirmButton: false,
          timer: 1500,
        });
        await window.location.reload();

        const nombre = localStorage.getItem('usuario');
        const payload = {
          usuario: nombre,
          folios: nuevaCantidadDeFolio,
        };
        dispatch(adminActions.update_admins(payload));
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
/*-----------------------------------------------------------------------------------------*/
/*DESLOGUEO DE USUARIOS*/
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
const adminFiltered = Array.isArray(admins) ? admins.filter(admin => admin.rol === 2) : [];
/*ELIMINAR USUARIOS----------------------------------------------------------*/
function captureSelect(){
setSelectUser(inputSelectUser.current.value)
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
setUserValue(userSelect.current.value)
}
function capturarValorFolios(){
setAddFolioValue(AgregarFolio.current.value)
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
      <div className='w-full h-[10vh] bg-[#0000ff9a] text-center'>
        <p className='text-[white] text-[3rem] font-thin '>Panel de Administrador</p>
      </div>
      <div className='w-full h-auto bg-[#0000ff9a] flex'>
        <div className='w-[28%] h-screen bg-[#6363b39a] py-[5rem] px-[2rem] flex flex-col gap-[3rem] '>
          {superAdmin === '1' ? (
            <>
            <button onClick={()=>openModal('opcion1')} className='w-[80%] h-[2.5rem] bg-[blue] text-white rounded-[5px] hover:bg-[#5353a0]'>Crear usuarios</button>
            <button onClick={()=>openModal('opcion2')} className='w-[80%] h-[2.5rem] bg-[blue] text-white rounded-[5px] hover:bg-[#5353a0]'>Control de usuarios</button>
            <button onClick={()=>openModal('opcion3')} className='w-[80%] h-[2.5rem] bg-[blue] text-white rounded-[5px] hover:bg-[#5353a0]'>Eliminar usuario</button>
            <button onClick={()=>openModal('opcion4')} className='w-[80%] h-[2.5rem] bg-[blue] text-white rounded-[5px] hover:bg-[#5353a0]'>Subir licencias</button>
            <button onClick={()=>openModal('opcion5')} className='w-[80%] h-[2.5rem] bg-[blue] text-white rounded-[5px] hover:bg-[#5353a0]'>Editar/Eliminar licencias</button>
            <button onClick={LogOut} className='w-[80%] h-[2.5rem] bg-[blue] text-white rounded-[5px] hover:bg-[#5353a0]'>Cerrar sesión</button>
            </>
          ):
          <>
          <button onClick={()=>openModal('opcion4')} className='w-[80%] h-[2.5rem] bg-[blue] text-white rounded-[5px] hover:bg-[#5353a0]'>Subir licencias</button>
          <button onClick={LogOut} className='w-[80%] h-[2.5rem] bg-[blue] text-white rounded-[5px] hover:bg-[#5353a0]'>Cerrar sesión</button>
          </>
          }
           
            
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
            <p>(Agrega el numero de folios para un Admin)</p>
            <div className='w-[90%] h-[8vh] bg-[black] flex items-center justify-around rounded-[5px]'>
            <p className='text-[white]' >Usuario:</p>
            <select onChange={capturarUsuario} ref={userSelect} className='w-[15rem]'>
              <option value=''>Selecciona el admin</option>
            {adminFiltered.map(admin=>(
              <option value={admin.usuario}>{admin.usuario}</option>
              ))}
              </select>
            <input ref={AgregarFolio} onChange={capturarValorFolios}  className='w-[15%]  px-[1rem] py-[0.3rem] rounded-[5px]' type="number" placeholder='N° folios'/>
            <button onClick={agregarMasFolios} className='bg-[green] text-[white] px-[1rem] py-[0.3rem] rounded-[10px] hover:bg-[#53a05d]'>Añadir cantidad de folios</button>
            </div>
            </div>
            )}
            {opcionSelect === 'opcion3' && (
              <div className='w-[80%] bg-[white] h-auto rounded-[10px] border-solid border-[1px] border-[gray] flex flex-col justify-around items-center py-[2rem] gap-5'>
            <p className='text-[2rem]'>Elimina un usuario</p>
            <select onChange={captureSelect} ref={inputSelectUser} className='w-[70%]  border-solid border-[1px] border-[gray] rounded-[5px] px-[1rem] placeholder:px-[1rem] h-[2.1rem]' name="" id="">
                <option value="">Selecciona el usuario que quieres eliminar</option>
                {admins?.map(admin=>(
                  <option key={admin._id} value={admin.usuario}>{admin.usuario}</option>
            ))}
            </select>
            <button onClick={deleteUser} className='bg-[red] w-[70%] h-[2.5rem] text-[white] rounded-[10px] hover:bg-[#a05353]'>Eliminar admin</button>
            </div>
            )}
            {opcionSelect === 'opcion4' && (
              <div className='w-[80%] bg-[white] h-auto rounded-[10px] border-solid border-[1px] border-[gray] flex flex-col justify-around items-center py-[1rem] gap-4'>
            <p className='text-[2rem]'>Alta de licencias </p>
            <p>Cantidad de folios disponibles: {cantidadDeFOlio}</p>
            <div className='flex flex-col px-[1rem] w-[60%]'>
            <p>Foto:</p>
            <input   ref={inputFoto}  className='w-[99%]  border-solid border-[1px] border-[gray] rounded-[5px]' type="file" placeholder='Foto' onChange={e=> setFile(e.target.files[0])} />
            </div>
            <div className='flex flex-col px-[1rem] w-[60%]'>
            <p>NOMBRE COMPLETO</p>
            <input onChange={captureNombre} ref={inputNombre} className='w-[99%]  border-solid border-[1px] border-[gray] rounded-[5px] px-[1rem] placeholder:px-[1rem] h-[2rem]' type="text"  />
            </div>
            <div className='flex flex-col px-[1rem] w-[60%]'>
            <p>FOLIO / TIPO</p>
            <input onChange={captureFolioForm} ref={inputFolioForm} className='w-[99%]  border-solid border-[1px] border-[gray] rounded-[5px] px-[1rem] placeholder:px-[1rem] h-[2rem]' type="text" />
            </div>
            <div className='flex flex-col px-[1rem] w-[60%]'>
            <p>RFC / CURP</p>
            <input onChange={captureRfc} ref={inputRfc} className='w-[99%]  border-solid border-[1px] border-[gray] rounded-[5px] px-[1rem] placeholder:px-[1rem] h-[2rem]' type="text"/>
            </div>
            <div className='flex flex-col px-[1rem] w-[60%]'>
            <p>FECHA DE EXPEDICIÓN</p>
            <input onChange={captureExpedicion} ref={inputExpedicion} className='w-[99%]  border-solid border-[1px] border-[gray] rounded-[5px] px-[1rem] placeholder:px-[1rem] h-[2rem]' type="date"  />
            </div>
            <div className='flex flex-col px-[1rem] w-[60%]'>
            <p>VIGENCIA</p>
            <input onChange={captureVigencia} ref={inputVigencia} className='w-[99%]  border-solid border-[1px] border-[gray] rounded-[5px] px-[1rem] placeholder:px-[1rem] h-[2rem]' type="date"  />
            </div>
            
            <div  className='flex flex-col px-[1rem] w-[60%]'>
            <p>Estado al que pertenece:</p>
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
             <p className='text-[2rem]'>Edita o elimina una licencia de cliente</p>
             <select className='w-[70%]  border-solid border-[1px] border-[gray] rounded-[5px] px-[1rem] placeholder:px-[1rem] h-[2.1rem]' name="" id="">
                 <option value="">Selecciona el cliente que quieres editar o eliminar</option>
                 {licencias.map(licencia=>(
                   <option value={licencia._id}>{licencia.nombre}</option>
                   ))}
             </select>
             <select className='w-[70%]  border-solid border-[1px] border-[gray] rounded-[5px] px-[1rem] placeholder:px-[1rem] h-[2.1rem]' name="" id="">
                 <option value="">Tipo de dato a Editar</option>
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
