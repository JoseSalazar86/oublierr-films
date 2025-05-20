import React from 'react'
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase"; 



function ButtonLogin() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => navigate("/login");  
  
  const handleLogout = async () => {
    await signOut(auth);
    navigate("/"); // Redirige al Home tras cerrar sesión
  };

  return (
    <div className="auth-buttons">
      {!user ? (
        <>
          <button onClick={handleLogin} className="auth-btn">Iniciar sesión</button>
        </>
      ) : (
        <button onClick={handleLogout} className="auth-btn">Cerrar sesión</button>
      )}
    </div>
  );
}

export default ButtonLogin;

