import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import adminActions from '../../redux/actions/admins.js';

export default function UsuariosEnLinea() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(adminActions.read_admins());
  }, [dispatch]);
  

  const usuarios = useSelector((store) => store.admins.admins);

  return (
    <div className='w-full h-screen bg-white flex justify-center py-[2rem]'>
      <table className='border border-gray-500 w-[60%]'>
        <thead>
          <tr>
            <th className='border-[gray] border-solid border-[1px] p-2'>USUARIO</th>
            <th className='border-[gray] border-solid border-[1px] p-2'>ESTADO</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((user) => (
            <tr key={user.id}>
              <td className='border-[gray] border-solid border-[1px] p-2 text-center'>{user.usuario}</td>
              <td className='border-[gray] border-solid border-[1px] p-2 text-center'>
                {user.online ? (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Conectado
                    <span className="h-2 w-2 ml-2 rounded-full bg-green-500"></span>
                  </span>
                ) : (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                    Desconectado
                    <span className="h-2 w-2 ml-2 rounded-full bg-red-500"></span>
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
