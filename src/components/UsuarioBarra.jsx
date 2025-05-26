import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import ButtonLogin from "./ButtonLogin";
import "../css/barraUsuario.css"

/**
 * Barra superior con la info de usuario y botón de cerrar/cerrar sesión.
 */
const UsuarioBarra = () => {
  const { user } = useAuth();

  return (
   <div className="usuario-barra">
      {/* Siempre dejar este bloque, aunque esté vacío */}
      <div className="usuario-barra__info">
        {user && (
          <>
            <h3 className="usuario-barra__nombre">{user?.nombre || user?.email}!</h3>
            <Link to="/dashboard/perfil" className="usuario-barra__perfil">
              Ir a tu perfil
            </Link>
          </>
        )}
      </div>
      <ButtonLogin />
    </div>
  );
};

export default UsuarioBarra;

