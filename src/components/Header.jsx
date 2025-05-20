import React from 'react';
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import DarkModeToggle from "./DarkModeToggle";
import "../css/index.css"

function Header() {
  const { user } = useAuth();

  return (
    <header className="header">
      <div className="header-left">
        <img
          src=""
          alt="Oublier Films"
          className="logo"
        />
        <h1>Oublier Films</h1>
      </div>

      <nav className="nav">
        <ul className="nav-list">
          {/* Enlace Inicio adaptativo */}
          <li><Link to={user ? "/dashboard" : "/"}>Inicio</Link></li>
          <li><Link to="/peliculas">Peliculas</Link></li>
          <li><Link to="/contacto">Contacto</Link></li>

          {user && (
            <>
              <li><Link to="/dashboard/favoritos">Favoritos</Link></li>
              <li><Link to="/dashboard/perfil">Perfil</Link></li>
            </>
          )}
        </ul>
      </nav>

      <DarkModeToggle />
    </header>
  );
}

export default Header;


