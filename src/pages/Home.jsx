import React from "react";
import { useNavigate } from "react-router-dom";
import CardPelicula from "../components/CardPelicula";
import useApi from "../hooks/useApi";
import ExplorarGeneros from "../components/ExplorarGeneros";
import ButtonRegister from "../components/ButtonRegister";
import "../css/home.css"
import "../css/index.css"




/**
 * Página de inicio - Home
 * Aplica metodología BEM para todas las clases.
 */
const Home = () => {
  const navigate = useNavigate();

  // Datos de la API de TMDB (películas populares, estrenos, mejor valoradas, próximas)
  const { data: populares } = useApi("/movie/popular");
  const { data: estrenos } = useApi("/movie/now_playing");
  const { data: mejorValorada } = useApi("/movie/top_rated");
  const { data: proximamente } = useApi("/movie/upcoming");

  return (
    <section className="home">
      {/* Hero principal */}
      <div className="home__hero">
        <h1 className="home__hero-titulo">Descubre las películas más populares</h1>
        <button
          className="home__hero-btn"
          onClick={() => navigate("/peliculas")}
        >
          Explorar ahora
        </button>
      </div>

      {/* Sección: Populares hoy */}
      <div className="home__seccion">
        <h2 className="home__seccion-titulo">Populares hoy</h2>
        <div className="home__grid-peliculas">
          {populares &&
            populares.slice(0, 12).map((peli) => (
              // Card de película (BEM)
              <CardPelicula key={peli.id} pelicula={peli} />
            ))}
        </div>
      </div>

      {/* Sección: Estrenos recientes */}
      <div className="home__seccion">
        <h2 className="home__seccion-titulo">Estrenos recientes</h2>
        <div className="home__grid-peliculas">
          {estrenos &&
            estrenos.slice(0, 12).map((peli) => (
              <CardPelicula key={peli.id} pelicula={peli} />
            ))}
        </div>
      </div>

      {/* Layout principal de columnas */}
      <div className="home__columns">
        {/* Columna izquierda: explorar géneros y registro */}
        <div className="home__col home__col--left">
          {/* Explorar por género (componente) */}
          <ExplorarGeneros />
          {/* Llamada a registro */}
          <div className="home__registro-llamada">
            <p className="home__registro-texto">
              ¿Quieres guardar tus favoritos?
              <br />
              ¡Crea una cuenta!
            </p>
            <ButtonRegister />
          </div>
        </div>

        {/* Columna derecha: tendencia, mejor valorada, próximamente */}
        <div className="home__col home__col--right">
          {/* En tendencia */}
          <div className="home__tendencia">
            <h3 className="home__box-titulo">En tendencia</h3>
            {proximamente && proximamente.length > 0 && (
              <CardPelicula pelicula={proximamente[0]} />
            )}
          </div>

          {/* Mejor valorada */}
          <div className="home__mejor-valorada">
            <h3 className="home__box-titulo">Mejor Valorada</h3>
            {mejorValorada && mejorValorada.length > 0 && (
              <CardPelicula pelicula={mejorValorada[0]} />
            )}
          </div>

          {/* Próximamente */}
          <div className="home__proximamente">
            <h3 className="home__box-titulo">Próximamente</h3>
            {proximamente && proximamente.length > 0 && (
              <CardPelicula pelicula={proximamente[4]} />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;

