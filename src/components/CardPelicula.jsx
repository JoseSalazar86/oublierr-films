import { useNavigate } from "react-router-dom";
import "../css/cardPeliculas.css"

/**
 * Componente CardPelicula
 * Muestra una tarjeta con la imagen y el título de la película.
 * Al hacer clic en la tarjeta, navega a la página de detalle de la película.
 *
 * Props:
 * - pelicula: objeto con información de la película (id, title, poster_path)
 */
const CardPelicula = ({ pelicula }) => {
  const navigate = useNavigate();
  const { id, title, poster_path } = pelicula;

  // Maneja el clic en la tarjeta para navegar al detalle de la película
  const handleClick = () => {
    navigate(`/pelicula/${id}`);
  };

  return (
    // Bloque principal de la tarjeta
    <div className="card-pelicula" onClick={handleClick}>
      {/* Elemento: imagen de la película */}
      <img
        src={`https://image.tmdb.org/t/p/w300${poster_path}`}
        alt={title}
        className="card-pelicula__img"
      />
      {/* Elemento: información de la tarjeta (aquí solo el título, puedes añadir más) */}
      <div className="card-pelicula__info">
        {/* Elemento: título de la película */}
        <h4 className="card-pelicula__titulo">{title}</h4>
      </div>
    </div>
  );
};

export default CardPelicula;

