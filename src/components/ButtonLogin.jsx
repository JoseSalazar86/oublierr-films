import React from 'react';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";
import "../css/loginRegister.css"

/**
 * Botón de autenticación BEM.
 * - Si el usuario NO está logueado: muestra "Iniciar sesión"
 * - Si el usuario está logueado: muestra "Cerrar sesión" y realiza signOut en Firebase
 */
function ButtonLogin() {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Navega a la página de login
  const handleLogin = () => navigate("/login");

  // Cierra sesión y navega al home
  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  return (
    <div className="auth-buttons">
      {!user ? (
        // Mostrar botón "Iniciar sesión" si NO hay usuario
        <button onClick={handleLogin} className="auth-buttons__btn">
          Iniciar sesión
        </button>
      ) : (
        // Mostrar botón "Cerrar sesión" si hay usuario
        <button onClick={handleLogout} className="auth-buttons__btn">
          Cerrar sesión
        </button>
      )}
    </div>
  );
}

export default ButtonLogin;



