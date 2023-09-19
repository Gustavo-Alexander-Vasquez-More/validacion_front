import axios from "axios";
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
  export default LogOut()