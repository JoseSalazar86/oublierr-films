import React from "react";
import { useNavigate } from "react-router-dom";

function ButtonRegister() {
  const navigate = useNavigate();

  const handleRegister = () => {
    navigate("/register");
  };

  return (
    <div className="auth-buttons">
      <button onClick={handleRegister} className="auth-btn boton-registrarse">
      Registrarse
      </button>
    </div>
  );
}

export default ButtonRegister;
