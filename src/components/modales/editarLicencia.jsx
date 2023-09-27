import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import es from 'date-fns/locale/es';
import licenciaActions from '../../redux/actions/licenciaAction.js';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import estados from '../../redux/actions/estados.js'

export default function EditarLicencia() {
const [opcionSelect, setOpcionSelect] = useState('');
const [inputValue, setInputValue] = useState('');
console.log(inputValue);
const dispatch=useDispatch()
function handleSelectChange(event) {
    setOpcionSelect(event.target.value);
    setInputValue(''); // Resetea el valor del input cuando cambia la opción
  }
  function handleInputChange(event) {
    setInputValue(event.target.value);
}
function handleDatePickerChange(date) {
    setInputValue(date);  // Actualiza inputValue con la fecha seleccionada
  }
 
const param=localStorage.getItem('folioEdit')
async function editarLicencia(){
    const payload={
        parametro:param,
        datos: {
            [opcionSelect]: inputValue
          }
        }
        console.log(payload);
    try {
        if(payload){
        await dispatch(licenciaActions.update_licencias(payload)) 
         dispatch(licenciaActions.read_licencia(1))
         dispatch(licenciaActions.read_Alllicencias())
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Licencia Editada',
            showConfirmButton: false,
            timer: 1500
          });
          
        }
        else{
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'No se pudo editar'
              });
            }
        
    } catch (error) {
        console.log(error);

    }
    
}
useEffect(() => {
  dispatch(estados.read_estados())
  dispatch(licenciaActions.read_licencia())
  dispatch(licenciaActions.read_Alllicencias())
}, [dispatch]);

const estado=useSelector((store)=>store.estados.estados)
console.log(estado);
return (
    <div className='w-full h-[50vh] '>
      <div className='w-full h-[5vh] flex justify-center items-center'>
        <p>EDITOR DE LICENCIAS</p>
      </div>
      <div className='w-full flex justify-center h-auto'>
        <div className='lg:w-[30%] w-[80%] border-solid border-[1px] border-[gray] px-[1rem] py-[1rem] flex flex-col gap-5 rounded-[5px]'>
          <div className='flex flex-col gap-3'>
            <p className='lg:text-[1.3rem] text-[0.9rem] font-semibold'>Selecciona el tipo de dato a editar</p>
            <select className='rounded-[5px] py-[0.3rem] px-[0.5rem] border-solid border-[2px] border-gray-400'  name='' id='' onChange={handleSelectChange}>
              <option  value=''>Selecciona el dato</option>
              <option  value='nombre'>Nombre</option>
              <option value='folio'>Folio</option>
              <option value='tipo'>Tipo</option>
              <option value='rfc_curp'>RFC/CURP</option>
              <option value="expedicion">Expedición</option>
              <option value="vigencia">Vigencia</option>
              <option value="estado_id">Estado</option>
            </select>
          </div>
          <div>
            {opcionSelect === 'nombre' && (
              <input 
              className='rounded-[5px] w-full py-[0.2rem] px-[0.5rem] border-[2px] border-gray-400'
                type='text'
                placeholder='Escribe el nombre'
                value={inputValue}
                onChange={handleInputChange}
              />
            )}
            {opcionSelect === 'folio' && (
              <input 
              className='rounded-[5px] w-full py-[0.2rem] px-[0.5rem] border-[2px] border-gray-400'
                type='text'
                placeholder='Escribe el folio'
                value={inputValue}
                onChange={handleInputChange}
              />
            )}
            {opcionSelect === 'tipo' && (
                <input
                className='rounded-[5px] w-full py-[0.2rem] px-[0.5rem] border-[2px] border-gray-400'
                  type='text'
                  placeholder='Tipo de licencia'
                  value={inputValue}
                  onChange={handleInputChange}
                />
              )}
              {opcionSelect === 'rfc_curp' && (
              <input
              className='rounded-[5px] w-full py-[0.2rem] px-[0.5rem] border-[2px] border-gray-400'
                type='text'
                placeholder='RFC/CURP'
                value={inputValue}
                onChange={handleInputChange}
              />
            )}
            {opcionSelect === 'expedicion' && (
              <DatePicker
              selected={inputValue}
              onChange={handleDatePickerChange}
              className='rounded-[5px] w-full py-[0.2rem] px-[0.5rem] border-[2px] border-gray-400'
              placeholderText='dd/mm/aaaa'
              dateFormat='dd/MM/yyyy'
              locale={es} 
            />
          )}
            
            {opcionSelect === 'vigencia' && (
              <input className='rounded-[5px] w-full py-[0.2rem] px-[0.5rem] border-[2px] border-gray-400' 
                type='text'
                placeholder='Escribe la fecha de vigencia'
                value={inputValue}
                onChange={handleInputChange}
              />
            )}
            {opcionSelect === 'estado_id' && (
              <select name="" id="" onChange={handleInputChange} className='rounded-[5px] w-full py-[0.2rem] px-[0.5rem] border-[2px] border-gray-400'>
                <option value=''>Selecciona el estado</option>
                {estado.map((estado) => (
    <option key={estado.id} value={estado.nombre}>
      {estado.nombre}
    </option>
                ))}
              </select>
            )}
            </div>
            <div className='w-full flex justify-center'>

            <button onClick={editarLicencia} className='lg:w-[30%] sm:w-[40%] w-full py-[0.3rem] bg-[#2aca2a] hover:bg-[green] text-[white] rounded-[10px]'>Editar</button>
            </div>
        </div>
      </div>
    </div>
  );
}
