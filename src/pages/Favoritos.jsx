import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../css/favorito.css"
/**
 * Página Favoritos: muestra los favoritos almacenados en localStorage,
 * con imagen, título, tipo y botón para eliminar.
 */
function Favoritos() {
  const [favoritos, setFavoritos] = useState([]);

  // Cargar favoritos al montar
  useEffect(() => {
    cargarFavoritos();
  }, []);

  // Carga los favoritos del localStorage
  const cargarFavoritos = () => {
    const guardados = JSON.parse(localStorage.getItem("favoritos")) || [];
    setFavoritos(guardados);
  };

  // Elimina un favorito por id
  const eliminarFavorito = (id) => {
    const nuevosFavoritos = favoritos.filter((f) => f.id !== id);
    setFavoritos(nuevosFavoritos);
    localStorage.setItem("favoritos", JSON.stringify(nuevosFavoritos));
  };

  return (
    <section className="favoritos">
      <h2 className="favoritos__titulo">Mis favoritos</h2>
      {favoritos.length === 0 ? (
        <p className="favoritos__vacio">No tienes ningún favorito guardado.</p>
      ) : (
        <ul className="favoritos__lista">
          {favoritos.map((item, idx) => (
            <li className="favoritos__item" key={idx}>
              <Link className="favoritos__link" to={`/pelicula/${item.id}`}>
                <div className="favoritos__card">
                  <img
                    className="favoritos__poster"
                    src={
                      item.poster
                        ? `https://image.tmdb.org/t/p/w200${item.poster}`
                        : "https://via.placeholder.com/80x120?text=No+img"
                    }
                    alt={item.nombre}
                  />
                  <div className="favoritos__info">
                    <span className="favoritos__nombre">{item.nombre}</span>
                    {item.tipo && <span className="favoritos__tipo">{item.tipo}</span>}
                  </div>
                </div>
              </Link>
              <button
                className="favoritos__eliminar"
                onClick={() => eliminarFavorito(item.id)}
                title="Eliminar de favoritos"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default Favoritos;

