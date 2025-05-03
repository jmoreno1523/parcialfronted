import { useState } from "react";
import HistorialCompras from "./historialcompras";

function UsuarioCompra() {
  const [producto, setProducto] = useState("");
  const [precio, setPrecio] = useState("");
  const [pagoIniciado, setPagoIniciado] = useState(false);
  const [nombre, setNombre] = useState("");
  const [cedula, setCedula] = useState("");
  const [telefono, setTelefono] = useState("");
  const [tarjeta, setTarjeta] = useState("");
  const [fechaVencimiento, setFechaVencimiento] = useState("");
  const [ccv, setCCV] = useState("");
  const [mensaje, setMensaje] = useState("");

  // Tarjeta predefinida para validación
  const tarjetaValida = {
    numero: "9858658998562541",
    fecha: "12/29",
    ccv: "596",
  };

  const handlePagar = () => {
    if (!producto || !precio || isNaN(precio)) {
      alert("Ingrese un producto válido y un precio numérico.");
      return;
    }
    setPagoIniciado(true);
  };

  const handleValidarPago = async () => {
    if (tarjeta === tarjetaValida.numero && fechaVencimiento === tarjetaValida.fecha && ccv === tarjetaValida.ccv) {
      setMensaje("✅ Pago exitoso");
      
      // Enviar datos al backend
      try {
        const response = await fetch("https://parcial-backend-three.vercel.app/api/nuevaVenta", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            producto,
            precio,
            nombre,
            tarjeta,
            cedula,
            telefono,
            estado: "Aceptado"
          }),
        });

        const data = await response.json();

        if (response.ok) {
          setMensaje("✅ Pago registrado con éxito");
        } else {
          setMensaje("❌ Error: " + data.message);
        }
      } catch (err) {
        setMensaje("❌ Error al conectar con el servidor.");
      }
      
    } else {
      setMensaje("❌ Pago rechazado. Verifique los datos e intente nuevamente.");
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2>Compra de Producto</h2>

      {/* Entrada de datos del producto */}
      <input
        type="text"
        placeholder="Nombre del producto"
        value={producto}
        onChange={(e) => setProducto(e.target.value)}
        disabled={pagoIniciado}
        style={{ padding: "8px", margin: "5px" }}
      />
      <br />
      <input
        type="text"
        placeholder="Valor del producto"
        value={precio}
        onChange={(e) => setPrecio(e.target.value)}
        disabled={pagoIniciado}
        style={{ padding: "8px", margin: "5px" }}
      />
      <br />
      {!pagoIniciado && (
        <button onClick={handlePagar} style={styles.botonPagar}>
          Pagar
        </button>
      )}

      {/* Formulario de pago */}
      {pagoIniciado && (
        <div>
          <h3>Datos de Pago</h3>
          <input
            type="text"
            placeholder="Nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            style={styles.input}
          />
          <br />
          <input
            type="text"
            placeholder="Cédula"
            value={cedula}
            onChange={(e) => setCedula(e.target.value)}
            style={styles.input}
          />
          <br />
          <input
            type="text"
            placeholder="Teléfono"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            style={styles.input}
          />
          <br />
          <input
            type="text"
            placeholder="Número de tarjeta"
            value={tarjeta}
            onChange={(e) => setTarjeta(e.target.value)}
            style={styles.input}
          />
          <br />
          <input
            type="text"
            placeholder="Fecha de vencimiento (MM/YY)"
            value={fechaVencimiento}
            onChange={(e) => setFechaVencimiento(e.target.value)}
            style={styles.input}
          />
          <br />
          <input
            type="text"
            placeholder="CCV"
            value={ccv}
            onChange={(e) => setCCV(e.target.value)}
            style={styles.input}
          />
          <br />
          <button onClick={handleValidarPago} style={styles.botonConfirmar}>
            Confirmar Pago
          </button>

          {/* Mensaje de validación */}
          {mensaje && <p style={{ fontWeight: "bold", marginTop: "10px" }}>{mensaje}</p>}
        </div>
      )}

      <HistorialCompras></HistorialCompras>

    </div>
  );
}

// Estilos en línea
const styles = {
  botonPagar: {
    backgroundColor: "#4CAF50",
    color: "white",
    padding: "10px 20px",
    margin: "10px",
    border: "none",
    cursor: "pointer",
  },
  input: {
    padding: "8px",
    margin: "5px",
    width: "200px",
  },
  botonConfirmar: {
    backgroundColor: "#FF5733",
    color: "white",
    padding: "10px 20px",
    border: "none",
    cursor: "pointer",
    marginTop: "10px",
  },
};

export default UsuarioCompra;

