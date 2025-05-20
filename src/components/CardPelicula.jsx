import { useNavigate } from "react-router-dom";

const CardPelicula = ({ pelicula }) => {
  const navigate = useNavigate();

  const { id, title, poster_path } = pelicula;

  return (
    <div className="card-pelicula" onClick={() => navigate(`/pelicula/${id}`)}>
      <img
        src={`https://image.tmdb.org/t/p/w300${poster_path}`}
        alt={title}
        className="card-img"
      />
      <div className="card-info">
        <h4>{title}</h4>
      </div>
    </div>
  );
};

export default CardPelicula;
