import { useState, useEffect } from "react";

export default function HistorialCompras() {
  const [compras, setCompras] = useState([]);

  // 📌 Cargar historial de compras desde el backend
  useEffect(() => {
    fetch("http://localhost:5000/compras/historial")
      .then((response) => response.json())
      .then((data) => setCompras(data))
      .catch((error) => console.error("Error cargando compras:", error));
  }, []);

  // 📌 Actualizar estado de la compra en el backend
  const actualizarEstado = (id) => {
    fetch(`http://localhost:5000/compras/actualizarEstado/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setCompras((prevCompras) =>
          prevCompras.map((compra) =>
            compra.id === id ? { ...compra, estado: "Completado" } : compra
          )
        );
      })
      .catch((error) => console.error("Error actualizando compra:", error));
  };

  return (
    <div>
      <h2>Historial de Compras</h2>
      <table border="1">
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Producto</th>
            <th>Valor</th>
            <th>Estado</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {compras.map((compra) => (
            <tr key={compra.id}>
              <td>{compra.fecha}</td>
              <td>{compra.producto}</td>
              <td>${compra.valor}</td>
              <td>{compra.estado}</td>
              <td>
                <button onClick={() => actualizarEstado(compra.id)}>Actualizar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
