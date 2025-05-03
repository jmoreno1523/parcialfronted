import { useState, useEffect } from "react";

export default function AdminPanel({ setView }) {
  const [ventas, setVentas] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/actualizarAdmin")
      .then((res) => res.json())
      .then((data) => {
        console.log("Ventas recibidas:", data); // Debug
        setVentas(data.ventas); // Acceder correctamente a "ventas"
      })
      .catch((error) => console.error("Error cargando datos:", error));
  }, []);

  const actualizarEstado = (id, nuevoEstado) => {
    fetch(`https://parcial-backend-three.vercel.app/api/actualizarEstado/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ estado: nuevoEstado }),
    })
      .then((res) => res.json())
      .then((data) => {
        setVentas(ventas.map((venta) => 
          venta._id === id ? { ...venta, estado: nuevoEstado } : venta
        ));
      })
      .catch((error) => console.error("Error actualizando estado:", error));
  };

  return (
    <div>
      <h2>Panel de Administrador</h2>
      <table border="1">
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Nombre</th>
            <th>Cédula</th>
            <th>Teléfono</th>
            <th>Tarjeta</th>
            <th>Producto</th>
            <th>Precio</th>
            <th>Estado</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {ventas.map((venta) => (
            <tr key={venta._id}>
              <td>{new Date(venta.fechaCompra).toLocaleDateString()}</td>
              <td>{venta.nombre}</td>
              <td>{venta.cedula}</td>
              <td>{venta.telefono}</td>
              <td>{venta.tarjeta}</td>
              <td>{venta.producto}</td>
              <td>${venta.precio}</td>
              <td>{venta.estado}</td>
              <td>
                <button onClick={() => actualizarEstado(venta._id, "Aprobado")}>Aprobar</button>
                <button onClick={() => actualizarEstado(venta._id, "Rechazado")}>Rechazar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={() => setView("login")}>Cerrar Sesión</button>
    </div>
  );
}
