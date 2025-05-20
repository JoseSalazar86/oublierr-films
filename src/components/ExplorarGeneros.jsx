import { Link } from "react-router-dom";

const ExplorarGeneros = () => {
  return (
    <div className="seccion genero-explorar">
      <h2>Explorar por género</h2>
      <nav className="generos-nav">
        <Link to="/buscar?genero=28">Acción</Link>
        <Link to="/buscar?genero=35">Comedia</Link>
        <Link to="/buscar?genero=27">Terror</Link>
        <Link to="/buscar?genero=16">Animación</Link>
      </nav>
    </div>
  );
};

export default ExplorarGeneros;
