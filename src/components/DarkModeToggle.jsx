import React from 'react';
import { useEffect, useState } from "react";


function DarkModeToggle() {
  const [modoOscuro, setModoOscuro] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("modoOscuro") === "true";
    setModoOscuro(stored);
    document.body.classList.toggle("dark", stored);
  }, []);

  const toggleModo = () => {
    const nuevoModo = !modoOscuro;
    setModoOscuro(nuevoModo);
    document.body.classList.toggle("dark", nuevoModo);
    localStorage.setItem("modoOscuro", nuevoModo);
  };

  return (
    <div className={`toggle-wrapper ${modoOscuro ? "dark" : "light"}`} onClick={toggleModo}>
      <div className="toggle-slider">
        <div className="toggle-circle">
          {modoOscuro ? "🌙" : "☀️"}
        </div>
      </div>
      <span className="toggle-label">{modoOscuro }</span>
    </div>
  );
}

export default DarkModeToggle;

