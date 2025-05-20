import React from 'react';
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

export default function NotFound() {
  const { user } = useAuth();

  return (
    <section>
      <h2>404 - Página no encontrada</h2>
      <p>La ruta que has intentado visitar no existe.</p>

      <Link
        to={user ? "/dashboard" : "/"}
      >
        Volver
      </Link>
    </section>
  );
}

