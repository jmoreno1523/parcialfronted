import { useState } from "react";

const CrearUsuario = ({ setView }) => {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleRegister = async () => {
    if (!usuario || !password) {
      setMensaje("Por favor, completa todos los campos.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/newuser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: usuario, password, rol: "usuario" }),
      });

      const data = await response.json();
      if (response.ok) {
        setMensaje("✅ Usuario registrado con éxito");
        setTimeout(() => setView("login"), 2000); // Redirige al login después de 2s
      } else {
        setMensaje(data.message || "❌ Error al registrar usuario");
      }
    } catch (error) {
      setMensaje("❌ Error de conexión con el servidor");
    }
  };

  return (
    <div style={styles.container}>
      <h2>Crear Usuario</h2>
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
  container: {
    textAlign: "center",
    padding: "20px",
    borderRadius: "10px",
    background: "#f4f4f4",
    width: "300px",
    margin: "auto",
  },
  input: {
    display: "block",
    width: "90%",
    padding: "10px",
    margin: "10px auto",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  button: {
    background: "#28a745",
    color: "white",
    border: "none",
    padding: "10px",
    width: "100%",
    borderRadius: "5px",
    cursor: "pointer",
  },
  backButton: {
    background: "#6c757d",
    color: "white",
    border: "none",
    padding: "10px",
    width: "100%",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "10px",
  },
};

export default CrearUsuario;

