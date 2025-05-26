import { Link } from "react-router-dom";
import "../css/explorarGenero.css"
/**
 * Componente para explorar películas por género.
 * Muestra enlaces de género usando BEM en las clases.
 */
const ExplorarGeneros = () => (
  <section className="explorar-generos">
    <h2 className="explorar-generos__titulo">Explorar por género</h2>
    <nav className="explorar-generos__nav">
      <Link className="explorar-generos__enlace" to="/peliculas?genero=28">Acción</Link>
      <Link className="explorar-generos__enlace" to="/peliculas?genero=35">Comedia</Link>
      <Link className="explorar-generos__enlace" to="/peliculas?genero=27">Terror</Link>
      <Link className="explorar-generos__enlace" to="/peliculas?genero=16">Animación</Link>
    </nav>
  </section>
);

export default ExplorarGeneros;
