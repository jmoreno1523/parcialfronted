import { useState } from "react";

const CrearAdmin = ({ setView }) => {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleRegister = async () => {
    if (!usuario || !password) {
      setMensaje("Por favor, completa todos los campos.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/newadmin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ usuario, password, rol: "admin" }),
      });

      const data = await response.json();

      if (response.ok) {
        setMensaje(`✅ Administrador ${usuario} registrado con éxito!`);
        setTimeout(() => setView("login"), 2000);
      } else {
        setMensaje(`❌ ${data.message || "Error al registrar administrador"}`);
      }
    } catch (error) {
      setMensaje("❌ Error de conexión con el servidor.");
    }
  };

  return (
    <div style={styles.container}>
      <h2>Registro de Administrador</h2>
      {mensaje && <p>{mensaje}</p>}
      <input
        type="text"
        placeholder="Usuario"
        value={usuario}
        onChange={(e) => setUsuario(e.target.value)}
        style={styles.input}
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={styles.input}
      />
      <button onClick={handleRegister} style={styles.button}>
        Registrar
      </button>
      <button onClick={() => setView("login")} style={styles.backButton}>
        Volver
      </button>
    </div>
  );
};

const styles = {
  container: { textAlign: "center", padding: "20px", background: "#f4f4f4" },
  input: { display: "block", width: "90%", padding: "10px", margin: "10px auto" },
  button: { background: "#dc3545", color: "white", padding: "10px", width: "100%", cursor: "pointer" },
  backButton: { background: "#6c757d", color: "white", padding: "10px", width: "100%", cursor: "pointer" },
};

export default CrearAdmin;
