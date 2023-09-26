import Index from "./pages/index"
function App() {
  window.addEventListener("beforeunload", () => {
    localStorage.removeItem('pagina'); // Eliminar 'pagina' de localStorage
  });
  return (
    <Index/>
  )
}

export default App
