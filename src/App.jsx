import { useState } from "react";
import Login from "./login";
import CrearUsuario from "./CrearUsuario";
import CrearAdmin from "./crearadmin";
import UsuarioCompra from "./usuariocompra";
import HistorialCompras from "./historialcompras";
import AdminPanel from "./adminpanel";

function App() {
  const [view, setView] = useState("login");

  return (
    <div>
      {view === "login" && <Login setView={setView} />}
      {view === "registerUser" && <CrearUsuario setView={setView} />}
      {view === "registerAdmin" && <CrearAdmin setView={setView} />}
      {view === "userPurchase" && <UsuarioCompra setView={setView} />}
      {view === "historialCompras" && <HistorialCompras setView={setView} />}
      {view === "adminView" && <AdminPanel setView={setView} />}
    </div>
  );
}

export default App;




