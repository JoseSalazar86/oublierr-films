import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Peliculas() {
  const { user } = useAuth();

  const [query, setQuery] = useState("");
  const [genero, setGenero] = useState("");
  const [anio, setAnio] = useState("");
  const [lenguaje, setLenguaje] = useState("");
  const [orden, setOrden] = useState("desc");
  const [resultados, setResultados] = useState([]);

  // Al cargar: películas populares
  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=es-ES`)
      .then(res => res.json())
      .then(data => setResultados(data.results || []));
  }, []);

  // Live search
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

  return (
    <section className="peliculas">
      <h2 className="titulo-seccion">Películas</h2>
      <form className="filtros-peliculas" onSubmit={e => e.preventDefault()}>
        <input type="text" placeholder="Buscar..." value={query} onChange={e => setQuery(e.target.value)} />
        <select value={genero} onChange={e => setGenero(e.target.value)}>
          <option value="">Género</option>
          <option value="28">Acción</option>
          <option value="35">Comedia</option>
          <option value="18">Drama</option>
        </select>
        <input type="number" placeholder="Año" value={anio} onChange={e => setAnio(e.target.value)} min="1900" max={new Date().getFullYear() + 1} />
        <select value={lenguaje} onChange={e => setLenguaje(e.target.value)}>
          <option value="">Idioma</option>
          <option value="es-ES">Español</option>
          <option value="en-US">Inglés</option>
        </select>
        <select value={orden} onChange={e => setOrden(e.target.value)}>
          <option value="desc">Descendente</option>
          <option value="asc">Ascendente</option>
        </select>
      </form>
      <div className="grid-peliculas">
        {resultados.length === 0 && <p>No se encontraron películas.</p>}
        {resultados.map((peli) => (
          <div key={peli.id} className="contenedor-pelicula">
            <div className="card-pelicula">
              <Link to={`/pelicula/${peli.id}`}>
                <img src={`https://image.tmdb.org/t/p/w200${peli.poster_path}`} alt={peli.title} />
                <div className="nombre">{peli.title}</div>
              </Link>
            </div>
            {user && (
              <button className="fav">+ Favoritos</button>
            )}
          </div>
        ))}
      </div>
      {!user && (
        <div style={{textAlign: "center", margin: "2em 0", color: "#888"}}>
          Inicia sesión para añadir películas a favoritos.
        </div>
      )}
    </section>
  );
}

export default Peliculas;
