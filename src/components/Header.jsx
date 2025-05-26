import React from 'react';
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import DarkModeToggle from "./DarkModeToggle";
import "../css/header.css"

/**
 * Header principal de la app.
 * Incluye logo, título, menú de navegación y el toggle de modo oscuro.
 */
function Header() {
  const { user } = useAuth();

  return (
    <header className="header">
      {/* Logo y título */}
      <div className="header__left">
        <img
          src="../public/logo-oublier_films.png"
          alt="Oublier Films"
          className="header__logo"
        />
        <h1 className="header__titulo">Oublier Films</h1>
      </div>

      {/* Menú de navegación */}
      <nav className="header__nav">
        <ul className="header__nav-list">
          {/* Enlace Inicio adaptativo */}
          <li><Link className="header__nav-link" to={user ? "/dashboard" : "/"}>Inicio</Link></li>
          <li><Link className="header__nav-link" to="/peliculas">Peliculas</Link></li>
          <li><Link className="header__nav-link" to="/contacto">Contacto</Link></li>
          {user && (
            <>
              <li><Link className="header__nav-link" to="/dashboard/favoritos">Favoritos</Link></li>
              <li><Link className="header__nav-link" to="/dashboard/perfil">Perfil</Link></li>
            </>
          )}
        </ul>
      </nav>

      {/* Botón para alternar modo oscuro */}
      <DarkModeToggle />
    </header>
  );
}

export default Header;



