import React from 'react';
import { useState } from "react";


function Contacto() {
  const [formulario, setFormulario] = useState({
    nombre: "",
    email: "",
    fecha: "",
    telefono: "",
    motivo: "",
    acepto: false,
  });

  const [errores, setErrores] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormulario({
      ...formulario,
      [name]: type === "checkbox" ? checked : value,
    });
    validarCampo(name, type === "checkbox" ? checked : value);
  };

  const validarCampo = (name, value) => {
    let error = "";

    if (name === "nombre" && value.trim().length < 3) {
      error = "El nombre debe tener al menos 3 letras.";
    }

    if (name === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      error = "Correo electrónico inválido.";
    }

    if (name === "fecha" && !value) {
      error = "Debes seleccionar una fecha.";
    }

    if (name === "telefono" && !/^\d{9}$/.test(value)) {
      error = "Introduce un número válido de 9 cifras.";
    }

    if (name === "acepto" && !value) {
      error = "Debes aceptar los términos.";
    }

    setErrores((prev) => ({ ...prev, [name]: error }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const hayErrores = Object.values(errores).some((e) => e !== "");
    const camposVacios = Object.entries(formulario).some(
      ([key, val]) => (key !== "acepto" && val === "") || (key === "acepto" && !val)
    );

    if (hayErrores || camposVacios) {
      alert("Por favor, completa todos los campos correctamente.");
      return;
    }

    alert("Formulario enviado correctamente.");
    // Aquí podrías enviar los datos a una API, si lo deseas
  };

  return (
    <section className="contacto">
      <h2>Contacto</h2>
      <form onSubmit={handleSubmit} noValidate>
        <div>
          <label>Nombre:</label>
          <input type="text" name="nombre" value={formulario.nombre} onChange={handleChange} />
          {errores.nombre && <span className="error">{errores.nombre}</span>}
        </div>

        <div>
          <label>Email:</label>
          <input type="email" name="email" value={formulario.email} onChange={handleChange} />
          {errores.email && <span className="error">{errores.email}</span>}
        </div>

        <div>
          <label>Fecha de contacto:</label>
          <input type="date" name="fecha" value={formulario.fecha} onChange={handleChange} />
          {errores.fecha && <span className="error">{errores.fecha}</span>}
        </div>

        <div>
          <label>Teléfono:</label>
          <input type="tel" name="telefono" value={formulario.telefono} onChange={handleChange} />
          {errores.telefono && <span className="error">{errores.telefono}</span>}
        </div>

        <div>
          <label>Motivo de contacto:</label>
          <select name="motivo" value={formulario.motivo} onChange={handleChange}>
            <option value="">-- Selecciona --</option>
            <option value="problema">Tengo un problema</option>
            <option value="sugerencia">Quiero sugerir algo</option>
            <option value="otro">Otro</option>
          </select>
        </div>

        <div>
          <label>
            <input type="checkbox" name="acepto" checked={formulario.acepto} onChange={handleChange} />
            Acepto los términos y condiciones
          </label>
          {errores.acepto && <span className="error">{errores.acepto}</span>}
        </div>

        <button type="submit">Enviar</button>
      </form>
    </section>
  );
}

export default Contacto;
