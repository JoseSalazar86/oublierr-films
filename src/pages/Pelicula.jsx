import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../css/pelicula.css"

function PeliculaDetalle() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pelicula, setPelicula] = useState(null);
  const [reparto, setReparto] = useState([]);
  const [trailerKey, setTrailerKey] = useState(null);

  // Datos de la película
  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=es-ES`)
      .then(res => res.json())
      .then(data => setPelicula(data));
  }, [id]);

  // Créditos (reparto)
  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=es-ES`)
      .then(res => res.json())
      .then(data => setReparto(data.cast ? data.cast.slice(0, 8) : []));
  }, [id]);

  // Trailer de YouTube
  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=es-ES`)
      .then(res => res.json())
      .then(data => {
        // Busca el primer vídeo tipo "Trailer" en YouTube
        const trailer = data.results?.find(
          vid => vid.type === "Trailer" && vid.site === "YouTube"
        );
        setTrailerKey(trailer ? trailer.key : null);
      });
  }, [id]);

  if (!pelicula) return <div>Cargando...</div>;

  return (
    <section className="pelicula-detalle">
      {/* CONTENIDO CENTRADO */}
      <div className="pelicula-detalle__contenido">
        <div className="pelicula-detalle__grid">
          {/* Poster */}
          <div className="pelicula-detalle__media">
            <img
              className="pelicula-detalle__poster"
              src={`https://image.tmdb.org/t/p/w500${pelicula.poster_path}`}
              alt={pelicula.title}
            />
          </div>
          {/* Info */}
          <div className="pelicula-detalle__info">
            <h1 className="pelicula-detalle__titulo">{pelicula.title}</h1>
            <p className="pelicula-detalle__anio"><strong>Año:</strong> {pelicula.release_date?.slice(0, 4)}</p>
            <p className="pelicula-detalle__puntuacion"><strong>Puntuación:</strong> {pelicula.vote_average}</p>
            <h4 className="pelicula-detalle__desc-titulo">Descripción</h4>
            <p className="pelicula-detalle__descripcion">{pelicula.overview}</p>
          </div>
        </div>

        {/* Reparto */}
        <div className="pelicula-detalle__reparto">
          <h3 className="pelicula-detalle__reparto-titulo">Reparto principal</h3>
          <div className="pelicula-detalle__reparto-lista">
            {reparto.length === 0 && <span>No disponible</span>}
            {reparto.map(actor => (
              <div className="pelicula-detalle__reparto-card" key={actor.cast_id || actor.id}>
                <img
                  src={actor.profile_path
                    ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
                    : "https://ui-avatars.com/api/?name=" + encodeURIComponent(actor.name)}
                  alt={actor.name}
                  className="pelicula-detalle__reparto-foto"
                />
                <span className="pelicula-detalle__reparto-nombre">{actor.name}</span>
                <span className="pelicula-detalle__reparto-personaje">{actor.character}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Trailer */}
        <div className="pelicula-detalle__trailer">
          <h3 className="pelicula-detalle__trailer-titulo">Tráiler</h3>
          {trailerKey ? (
            <div className="pelicula-detalle__trailer-video">
              <iframe
                width="480"
                height="270"
                src={`https://www.youtube.com/embed/${trailerKey}`}
                title="Trailer"
                allowFullScreen
              ></iframe>
            </div>
          ) : (
            <p>No hay tráiler disponible.</p>
          )}
        </div>

        {/* Botones */}
        <div className="pelicula-detalle__botones">
          <button className="pelicula-detalle__fav">+ Favoritos</button>
          <button className="pelicula-detalle__volver" onClick={() => navigate(-1)}>Volver a la búsqueda</button>
        </div>
      </div>
    </section>
  );
}

export default PeliculaDetalle;