import { useState } from "react";

export default function Login({ setView }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    if (!username || !password) {
      setError("Por favor, ingrese usuario y contraseña");
      return;
    }

    try {
      const response = await fetch("https://parcial-backend-three.vercel.app/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      if (response.ok) {
        if (data.role === "admin") {
          setView("adminView"); // Redirige a la vista de administrador
        } else {
          setView("userPurchase"); // Redirige a la vista de usuario
        }
      } else {
        setError(data.message || "Error en el inicio de sesión");
      }
    } catch (error) {
      setError("Error de conexión con el servidor");
    }
  };

  return (
    <div>
      <h2>Iniciar Sesión</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <input
        type="text"
        placeholder="Usuario"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <br />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <button onClick={handleLogin}>Login</button>
      <br />
      <p>
        ¿No tienes cuenta?
        <button onClick={() => setView("registerUser")}>Crear Usuario</button>
        <button onClick={() => setView("registerAdmin")}>Crear Admin</button>
      </p>
    </div>
  );
}


