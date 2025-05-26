import React, { useEffect, useState } from 'react';
import "../css/darkMode.css";

/**
 * Componente DarkModeToggle
 * Permite alternar entre modo claro y oscuro.
 * Aplica la clase "dark" al <body> y guarda la preferencia en localStorage.
 */
function DarkModeToggle() {
  // Estado para saber si está activado el modo oscuro
  const [modoOscuro, setModoOscuro] = useState(false);

  // Al montar: lee la preferencia de localStorage y aplica al body
  useEffect(() => {
    const stored = localStorage.getItem("modoOscuro") === "true";
    setModoOscuro(stored);
    document.body.classList.toggle("dark", stored);
  }, []);

  // Alterna entre modo claro/oscuro
  const toggleModo = () => {
    const nuevoModo = !modoOscuro;
    setModoOscuro(nuevoModo);
    document.body.classList.toggle("dark", nuevoModo);
    localStorage.setItem("modoOscuro", nuevoModo);
  };

  return (
    <div
      className={`toggle ${modoOscuro ? "toggle--dark" : "toggle--light"}`}
      onClick={toggleModo}
    >
      <div className="toggle__slider">
        <div className="toggle__circle">
          {modoOscuro ? "🌙" : "☀️"}
        </div>
      </div>
      <span className="toggle__label">
        {modoOscuro ? "Modo oscuro" : "Modo claro"}
      </span>
    </div>
  );
}

export default DarkModeToggle;
