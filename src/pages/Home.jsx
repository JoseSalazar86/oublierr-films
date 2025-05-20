import React from "react";
import { useNavigate } from "react-router-dom";
import CardPelicula from "../components/CardPelicula";
import useApi from "../hooks/useApi";
import "../css/index.css";
import ExplorarGeneros from "../components/ExplorarGeneros";
import ButtonRegister from "../components/ButtonRegister";

const Home = () => {
  const navigate = useNavigate();
  const { data: populares } = useApi("/movie/popular");
  const { data: estrenos } = useApi("/movie/now_playing");
  const { data: mejorValorada } = useApi("/movie/top_rated");
  const { data: proximamente } = useApi("/movie/upcoming");

  return (
    <section className="home">
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
    <ExplorarGeneros />
    <div className="registro-llamada">
      <p>
        ¿Quieres guardar tus favoritos?
        <br />
        ¡Crea una cuenta!
      </p>
      <ButtonRegister />
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
        <CardPelicula pelicula={proximamente[6]} />
      )}
    </div>
  </div>
</div>

    </section>
  )
};

export default Home;
