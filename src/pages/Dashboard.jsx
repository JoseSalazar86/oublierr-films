import React from "react";
import { useNavigate } from "react-router-dom";
import GenerosExplorar from "../components/ExplorarGeneros";
import CardPelicula from "../components/CardPelicula";
import useApi from "../hooks/useApi";
import { useAuth } from "../context/AuthContext"; 
import { Link } from "react-router-dom";

import "../css/index.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth(); // Asegúrate de tener este hook/contexto, ajústalo según tu lógica
  const { data: populares } = useApi("/movie/popular");
  const { data: estrenos } = useApi("/movie/now_playing");
  const { data: mejorValorada } = useApi("/movie/top_rated");
  const { data: proximamente } = useApi("/movie/upcoming");

  return (
    <section className="dashboard">

     


      <div className="hero">
        <h1>Descubre las películas más populares</h1>
        <button onClick={() => navigate("/peliculas")}>Explorar ahora</button>
      </div>

      <div className="seccion">
        <h2>Populares hoy</h2>
        <div className="grid-peliculas">
          {populares &&
            populares.slice(0, 10).map((peli) => (
              <CardPelicula key={peli.id} pelicula={peli} />
            ))}
        </div>
      </div>

      <div className="seccion">
        <h2>Estrenos recientes</h2>
        <div className="grid-peliculas">
          {estrenos &&
            estrenos.slice(0, 10).map((peli) => (
              <CardPelicula key={peli.id} pelicula={peli} />
            ))}
        </div>
      </div>

      <div className="contenedor-principal">
        <div className="columna-izquierda">
          <GenerosExplorar />
          <div className="registro-llamada">
            <p>¡Gestiona tu cuenta y datos desde el perfil!</p>
          </div>
        </div>

        <div className="columna-derecha">
          <div className="tendencia">
            <h3>En tendencia</h3>
            {proximamente && proximamente.length > 0 && (
              <CardPelicula pelicula={proximamente[1]} />
            )}
          </div>

          <div className="mejor-valorada">
            <h3>Mejor Valorada</h3>
            {mejorValorada && mejorValorada.length > 0 && (
              <CardPelicula pelicula={mejorValorada[0]} />
            )}
          </div>

          <div className="proximamente">
            <h3>Próximamente</h3>
            {proximamente && proximamente.length > 0 && (
              <CardPelicula pelicula={proximamente[5]} />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
