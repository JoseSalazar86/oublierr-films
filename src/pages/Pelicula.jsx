import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function Pelicula() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pelicula, setPelicula] = useState(null);

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=es-ES`)
      .then(res => res.json())
      .then(data => setPelicula(data));
  }, [id]);

  if (!pelicula) return <div>Cargando...</div>;

  return (
    <div className="detalle-pelicula">
      <div className="detalle-header">
        <img
          src={`https://image.tmdb.org/t/p/w300${pelicula.poster_path}`}
          alt={pelicula.title}
        />
        <div className="detalle-header-content">
          <h2>{pelicula.title}</h2>
          <p className="detalle-info"><strong>Año:</strong> {pelicula.release_date?.slice(0, 4)}</p>
          <p className="detalle-rating">{pelicula.vote_average}</p>
          <h4>Descripción</h4>
          <p>{pelicula.overview}</p>
        </div>
      </div>
      <div className="botones-pelicula">
        <button
          className="volver-busqueda"
          onClick={() => navigate(-1)}
        >
          Volver a la búsqueda
        </button>
        <button className="fav">+ Favoritos</button>
      </div>
    </div>
  );
}

export default Pelicula;


