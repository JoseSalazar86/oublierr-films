import React from 'react';
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import "../css/notfound.css"; // Asegúrate de crear el archivo

function NotFound() {
  const { user } = useAuth();

  return (
    <section className="notfound">
      <div className="notfound__box">
        <h2 className="notfound__titulo">404 - Página no encontrada</h2>
        <p className="notfound__texto">La ruta que has intentado visitar no existe.</p>
        <Link
          to={user ? "/dashboard" : "/"}
          className="notfound__volver"
        >
          Volver al inicio
        </Link>
      </div>
    </section>
  );
}
export default NotFound;