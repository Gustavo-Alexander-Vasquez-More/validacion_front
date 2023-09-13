import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginProtect = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token) {
      navigate('/panelAdministrador');
    } else {
      navigate('/');
    }
  }, [token, navigate]);

  // Devuelve null ya que la redirección se maneja en useEffect
  return null;
};

export default LoginProtect;
