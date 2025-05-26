import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/loginRegister.css"

/**
 * Botón de registro BEM.
 * Redirige al usuario a la página de registro cuando se pulsa.
 */
function ButtonRegister() {
  const navigate = useNavigate();

  // Navega a la página de registro
  const handleRegister = () => {
    navigate("/register");
  };

  return (
    <div className="auth-buttons">
      <button
        onClick={handleRegister}
        className="auth-buttons__btn auth-buttons__btn--register"
      >
        Registrarse
      </button>
    </div>
  );
}

export default ButtonRegister;

