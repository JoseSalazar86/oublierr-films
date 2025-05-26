import React from "react";
import { useNavigate } from "react-router-dom";
import GenerosExplorar from "../components/ExplorarGeneros";
import CardPelicula from "../components/CardPelicula";
import useApi from "../hooks/useApi";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import "../css/index.css";
import "../css/dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { data: populares } = useApi("/movie/popular");
  const { data: estrenos } = useApi("/movie/now_playing");
  const { data: mejorValorada } = useApi("/movie/top_rated");
  const { data: proximamente } = useApi("/movie/upcoming");

  return (
    <section className="dashboard">
      {/* HERO */}
      <div className="dashboard__hero">
        <h1 className="dashboard__hero-title">Descubre las películas más populares</h1>
        <button className="dashboard__hero-btn" onClick={() => navigate("/peliculas")}>Explorar ahora</button>
      </div>

      {/* Sección: Populares hoy */}
      <div className="dashboard__section">
        <h2 className="dashboard__section-title">Populares hoy</h2>
        <div className="dashboard__grid-peliculas">
          {populares &&
            populares.slice(0, 12).map((peli) => (
              <CardPelicula key={peli.id} pelicula={peli} />
            ))}
        </div>
      </div>

      {/* Sección: Estrenos recientes */}
      <div className="dashboard__section">
        <h2 className="dashboard__section-title">Estrenos recientes</h2>
        <div className="dashboard__grid-peliculas">
          {estrenos &&
            estrenos.slice(0, 12).map((peli) => (
              <CardPelicula key={peli.id} pelicula={peli} />
            ))}
        </div>
      </div>

      {/* COLUMNAS */}
      <div className="dashboard__columns">
        {/* Izquierda */}
        <div className="dashboard__col dashboard__col--left">
          <GenerosExplorar />
          <div className="dashboard__registro-llamada">
            <p className="dashboard__registro-text">¡Gestiona tu cuenta y datos desde el perfil!</p>
          </div>
        </div>
        {/* Derecha */}
        <div className="dashboard__col dashboard__col--right">
          <div className="dashboard__box">
            <h3 className="dashboard__box-title">En tendencia</h3>
            {proximamente && proximamente.length > 0 && (
              <CardPelicula pelicula={proximamente[0]} />
            )}
          </div>
          <div className="dashboard__box">
            <h3 className="dashboard__box-title">Mejor Valorada</h3>
            {mejorValorada && mejorValorada.length > 0 && (
              <CardPelicula pelicula={mejorValorada[0]} />
            )}
          </div>
          <div className="dashboard__box">
            <h3 className="dashboard__box-title">Próximamente</h3>
            {proximamente && proximamente.length > 0 && (
              <CardPelicula pelicula={proximamente[4]} />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;

