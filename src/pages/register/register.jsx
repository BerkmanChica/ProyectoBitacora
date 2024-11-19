import React, { useState } from "react";
import { auth, db } from "../../firebase/firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import "./registro.css";

function RegistroUsuario() {
  const [correo, setCorreo] = useState("");
  const [nombre, setNombre] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [rol, setRol] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, correo, contrasena);
      const userDocRef = doc(db, "usuarios", userCredential.user.uid);
      await setDoc(userDocRef, { nombre, correo, rol });

      navigate("/");
    } catch (error) {
      setError("Hubo un problema al registrarse: " + error.message);
    }
  };

  const handleBackToHome = () => {
    navigate("/");
  };

  return (
    <div className="registro-container">
      <div className="registro-box">
        <h2 className="titulo">Crea tu cuenta</h2>
        <form onSubmit={handleSubmit} className="formulario">
          <div className="campo">
            <label htmlFor="nombre" className="label">Nombre completo</label>
            <input
              id="nombre"
              type="text"
              className="input"
              placeholder="Ingresa tu nombre completo"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
          </div>

          <div className="campo">
            <label htmlFor="correo" className="label">Correo electrónico</label>
            <input
              id="correo"
              type="email"
              className="input"
              placeholder="Ingresa tu correo"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              required
            />
          </div>

          <div className="campo">
            <label htmlFor="contrasena" className="label">Contraseña</label>
            <input
              id="contrasena"
              type="password"
              className="input"
              placeholder="Crea una contraseña"
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
              required
            />
          </div>

          <div className="campo-rol">
            <label className="label">Selecciona tu rol</label>
            <div className="roles">
              <label className="rol">
                <input
                  type="radio"
                  name="rol"
                  value="admin"
                  checked={rol === "admin"}
                  onChange={(e) => setRol(e.target.value)}
                />
                Administrador
              </label>
              <label className="rol">
                <input
                  type="radio"
                  name="rol"
                  value="inves"
                  checked={rol === "inves"}
                  onChange={(e) => setRol(e.target.value)}
                />
                Investigador
              </label>
              <label className="rol">
                <input
                  type="radio"
                  name="rol"
                  value="colab"
                  checked={rol === "colab"}
                  onChange={(e) => setRol(e.target.value)}
                />
                Colaborador
              </label>
            </div>
          </div>

          {error && <p className="error-message">{error}</p>}

          <button type="submit" className="btn-submit">Registrarse</button>
        </form>

        <button onClick={handleBackToHome} className="btn-back">Volver al inicio</button>
      </div>
    </div>
  );
}

export default RegistroUsuario;
