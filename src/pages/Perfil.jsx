import React from 'react';
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import "../css/index.css";

function Perfil() {
  const { user } = useAuth();
  const [favoritos, setFavoritos] = useState([]);
  const [datosPerfil, setDatosPerfil] = useState({
    username: "",
    nombre: "",
    apellido: "",
    fechaNacimiento: "",
    bio: "",
  });

  useEffect(() => {
    const guardados = JSON.parse(localStorage.getItem("favoritos")) || [];
    setFavoritos(guardados);

    const perfilGuardado = JSON.parse(localStorage.getItem("datosPerfil")) || {
      username: "",
      nombre: "",
      apellido: "",
      fechaNacimiento: "",
      bio: "",
    };
    setDatosPerfil(perfilGuardado);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDatosPerfil((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const guardarDatos = () => {
    localStorage.setItem("datosPerfil", JSON.stringify(datosPerfil));
    alert("Datos del perfil actualizados.");
  };

  const obtenerIniciales = () => {
    const { nombre, apellido } = datosPerfil;
    const n = nombre?.charAt(0) || "";
    const a = apellido?.charAt(0) || "";
    return `${n}${a}`.toUpperCase();
  };

  return (
    <section className="perfil">
      <h2>Perfil del usuario</h2>

      <div className="perfil-info">
        <div className="avatar">{obtenerIniciales()}</div>

        <label>Nombre de usuario:</label>
        <input
          type="text"
          name="username"
          value={datosPerfil.username}
          onChange={handleChange}
        />

        <p><strong>Email:</strong> {user?.email}</p>

        <label>Nombre:</label>
        <input
          type="text"
          name="nombre"
          value={datosPerfil.nombre}
          onChange={handleChange}
        />

        <label>Apellido:</label>
        <input
          type="text"
          name="apellido"
          value={datosPerfil.apellido}
          onChange={handleChange}
        />

        <label>Fecha de nacimiento:</label>
        <input
          type="date"
          name="fechaNacimiento"
          value={datosPerfil.fechaNacimiento}
          onChange={handleChange}
        />

        <label>Biografía / Descripción:</label>
        <textarea
          name="bio"
          value={datosPerfil.bio}
          onChange={handleChange}
          rows="4"
        />

        <button onClick={guardarDatos}>Guardar</button>
      </div>

      <h3>Favoritos guardados</h3>
      {favoritos.length === 0 ? (
        <p>No tienes ningún favorito guardado.</p>
      ) : (
        <ul className="favoritos-lista">
          {favoritos.map((item, index) => (
            <li key={index}>
              <strong>{item.nombre}</strong> ({item.tipo})
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default Perfil;

