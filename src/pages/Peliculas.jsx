import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../css/peliculas.css";

function Peliculas() {
  const { user } = useAuth();
  const location = useLocation();

  // Estados de filtros
  const [query, setQuery] = useState("");
  const [genero, setGenero] = useState("");   // ¡Este es importante!
  const [anio, setAnio] = useState("");
  const [lenguaje, setLenguaje] = useState("");
  const [orden, setOrden] = useState("desc");
  const [resultados, setResultados] = useState([]);

  // Cuando cambia la URL, lee el parámetro de género (si existe)
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const generoParam = params.get("genero");
    if (generoParam && generoParam !== genero) {
      setGenero(generoParam);
    }
    // Limpiar los filtros al entrar por género:
    // setQuery(""); setAnio(""); setLenguaje(""); setOrden("desc");
  // eslint-disable-next-line
  }, [location.search]);

  // Al cargar: películas populares si NO hay filtros
  useEffect(() => {
    if (!query && !genero && !anio && !lenguaje && orden === "desc") {
      fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=es-ES`)
        .then(res => res.json())
        .then(data => setResultados(data.results || []));
    }
  }, [query, genero, anio, lenguaje, orden]);

  // Filtro y búsqueda avanzada (live search)
  useEffect(() => {
    if (query || genero || anio || lenguaje || orden !== "desc") {
      let url = `https://api.themoviedb.org/3/discover/movie?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=${lenguaje || "es-ES"}`;
      if (genero) url += `&with_genres=${genero}`;
      if (anio) url += `&year=${anio}`;
      if (orden) url += `&sort_by=popularity.${orden}`;
      if (query) url += `&query=${encodeURIComponent(query)}`;
      fetch(url)
        .then(res => res.json())
        .then(data => setResultados(data.results || []));
    }
  }, [query, genero, anio, lenguaje, orden]);

  // Resto de tu render (lo dejo igual)
  return (
    <section className="peliculas">
      <h2 className="peliculas__titulo-seccion">Películas</h2>
      <form className="peliculas__filtros" onSubmit={e => e.preventDefault()}>
        <input
          type="text"
          className="peliculas__input"
          placeholder="Buscar..."
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
        <select
          className="peliculas__select"
          value={genero}
          onChange={e => setGenero(e.target.value)}
        >
          <option value="">Género</option>
          <option value="28">Acción</option>
          <option value="35">Comedia</option>
          <option value="18">Drama</option>
          <option value="27">Terror</option>
          <option value="16">Animación</option>
          {/* Añade los géneros que quieras */}
        </select>
        <input
          type="number"
          className="peliculas__input"
          placeholder="Año"
          value={anio}
          onChange={e => setAnio(e.target.value)}
          min="1900"
          max={new Date().getFullYear() + 1}
        />
        <select
          className="peliculas__select"
          value={lenguaje}
          onChange={e => setLenguaje(e.target.value)}
        >
          <option value="">Idioma</option>
          <option value="es-ES">Español</option>
          <option value="en-US">Inglés</option>
        </select>
        <select
          className="peliculas__select"
          value={orden}
          onChange={e => setOrden(e.target.value)}
        >
          <option value="desc">Descendente</option>
          <option value="asc">Ascendente</option>
        </select>
      </form>

      <div className="peliculas__grid">
        {resultados.length === 0 && <p className="peliculas__no-resultados">No se encontraron películas.</p>}
        {resultados.map((peli) => (
          <div key={peli.id} className="peliculas__card-wrapper">
            <div className="peliculas__card">
              <Link to={`/pelicula/${peli.id}`} className="peliculas__enlace">
                <img
                  src={`https://image.tmdb.org/t/p/w200${peli.poster_path}`}
                  alt={peli.title}
                  className="peliculas__img"
                />
                <div className="peliculas__nombre">{peli.title}</div>
              </Link>
            </div>
            {user && (
              <button className="peliculas__fav-btn">+ Favoritos</button>
            )}
          </div>
        ))}
      </div>
      {!user && (
        <div className="peliculas__mensaje-login">
          Inicia sesión para añadir películas a favoritos.
        </div>
      )}
    </section>
  );
}

export default Peliculas;
