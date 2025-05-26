import React, { useEffect, useState } from 'react';
import { useAuth } from "../context/AuthContext";
import "../css/perfil.css";

/**
 * Componente Perfil del usuario
 * - Permite editar los datos personales guardados en localStorage.
 * - Muestra avatar (iniciales), email y lista de favoritos guardados.
 */
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

  // Cargar datos del perfil y favoritos de localStorage al montar
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

  // Actualiza el estado del perfil al cambiar un campo
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDatosPerfil((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Guarda los datos del perfil en localStorage
  const guardarDatos = () => {
    localStorage.setItem("datosPerfil", JSON.stringify(datosPerfil));
    alert("Datos del perfil actualizados.");
  };

  // Genera las iniciales para el avatar
  const obtenerIniciales = () => {
    const { nombre, apellido } = datosPerfil;
    const n = nombre?.charAt(0) || "";
    const a = apellido?.charAt(0) || "";
    return `${n}${a}`.toUpperCase();
  };

  return (
    <section className="perfil">
      <h2 className="perfil__titulo">Perfil del usuario</h2>

      <div className="perfil__info">
        {/* Avatar con iniciales */}
        <div className="perfil__avatar">{obtenerIniciales()}</div>

        {/* Campos de edición */}
        <label className="perfil__label">Nombre de usuario:</label>
        <input
          className="perfil__input"
          type="text"
          name="username"
          value={datosPerfil.username}
          onChange={handleChange}
        />

        <p className="perfil__email">
          <strong>Email:</strong> {user?.email}
        </p>

        <label className="perfil__label">Nombre:</label>
        <input
          className="perfil__input"
          type="text"
          name="nombre"
          value={datosPerfil.nombre}
          onChange={handleChange}
        />

        <label className="perfil__label">Apellido:</label>
        <input
          className="perfil__input"
          type="text"
          name="apellido"
          value={datosPerfil.apellido}
          onChange={handleChange}
        />

        <label className="perfil__label">Fecha de nacimiento:</label>
        <input
          className="perfil__input"
          type="date"
          name="fechaNacimiento"
          value={datosPerfil.fechaNacimiento}
          onChange={handleChange}
        />

        <label className="perfil__label">Biografía / Descripción:</label>
        <textarea
          className="perfil__textarea"
          name="bio"
          value={datosPerfil.bio}
          onChange={handleChange}
          rows="4"
        />

        <button className="perfil__btn" onClick={guardarDatos}>
          Guardar
        </button>
      </div>

      <h3 className="perfil__subtitulo">Favoritos guardados</h3>
      {favoritos.length === 0 ? (
        <p className="perfil__sin-favoritos">No tienes ningún favorito guardado.</p>
      ) : (
        <ul className="perfil__favoritos-lista">
          {favoritos.map((item, index) => (
            <li className="perfil__favoritos-item" key={index}>
              <strong>{item.nombre}</strong> ({item.tipo})
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default Perfil;

