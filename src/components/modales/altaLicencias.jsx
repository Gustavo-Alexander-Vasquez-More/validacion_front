import React, { useEffect, useRef, useState } from 'react';
import {uploadFile} from '../../firebase/config.js'
import estadosActions from '../../redux/actions/estados.js';
import { useDispatch, useSelector } from 'react-redux';
import licenciaActions from '../../redux/actions/licenciaAction.js';
import Swal from 'sweetalert2';
import adminActions from '../../redux/actions/admins.js';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import es from 'date-fns/locale/es';
export default function altaLicencias() {
const dispatch=useDispatch()
const [file, setFile]=useState(null)
const [tipoValue, setTipoValue]=useState('')
const [nombreValue, setNombreValue]=useState('')
const [folio_tipoValue, setFolio_tipoValue]=useState('')
const [rfcValue, setRfcValue]=useState('')
const [expedicionValue, setExpedicionValue]=useState('')
const [vigeniaValue, setVigenciaValue]=useState('')
const [estadoValue, setEstadoValue]=useState('')
const inputFoto=useRef()
const inputNombre=useRef()
const inputFolioForm=useRef()
const inputTipe=useRef()
const inputRfc=useRef()
const inputExpedicion=useRef()
const inputVigencia=useRef()
const inputEstado=useRef()
const superAdmin=localStorage.getItem('rol')
const cantidadDeFOlio=localStorage.getItem('folios')
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

console.log(expedicionValue);
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
useEffect(() => {
    dispatch(estadosActions.read_estados())
}, []);
const datos=useSelector((store)=>store.estados.estados)
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
const rolUsuario = parseInt(localStorage.getItem('rol'));
    if (rolUsuario === 1 || (formData && cantidadDeFOlio > 0)) {
    if (rolUsuario !== 1) {
    const nuevaCantidadDeFolio = cantidadDeFOlio - 1;
    localStorage.setItem('folios', nuevaCantidadDeFolio.toString());
}
await dispatch(licenciaActions.create_licencia(data));
Swal.fire({
    position: 'center',
    icon: 'success',
    title: 'Licencia creada!',
    showConfirmButton: false,
    timer: 1500,
});
window.location.reload();
    if (rolUsuario !== 1) {
    const nuevaCantidadDeFolio = cantidadDeFOlio - 1;
    const nombre = localStorage.getItem('usuario');
    const payload = {
        usuario: nombre,
        folios: nuevaCantidadDeFolio,
};
await dispatch(adminActions.update_admins(payload));
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
}}
const handleFileChange = async (e) => {
    try {
    const selectedFile = e.target.files[0]; // Obtener el archivo seleccionado
    if (selectedFile) {
    const downloadURL = await uploadFile(selectedFile); // Subir el archivo y obtener la URL de descarga
    console.log('URL de descarga:', downloadURL);
setFile(downloadURL);
}
} catch (error) {
    console.error('Error al cargar el archivo:', error);
}};
  return (
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
            <DatePicker
  selected={expedicionValue}
  onChange={date => setExpedicionValue(date)}
  className='w-[99%] border-solid border-[1px] border-[gray] rounded-[5px] px-[1rem] placeholder:text-[black] h-[2rem]'
  placeholderText='dd/mm/aaaa'
  dateFormat='dd/MM/yyyy'
  locale={es} 
/>
            </div>
            <div className='flex flex-col px-[1rem] sm:w-[80%] lg:w-[60%]'>
            <p className='sm:text-[0.9rem]'>VIGENCIA</p>
            <input onChange={captureVigencia} ref={inputVigencia} className='w-[99%]  border-solid border-[1px] border-[gray] rounded-[5px] px-[1rem] placeholder:text-[black] h-[2rem]' type="text" placeholder='dd/mm/aaaa | permanente | no permanente' />
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
  );
}
