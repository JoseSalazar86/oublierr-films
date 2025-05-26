import React from "react";
import { Link } from "react-router-dom";
import "../css/footer.css"

/**
 * Footer del sitio web Oublier Films
 * Incluye enlaces a redes sociales, páginas legales y el aviso de copyright.
 * Usa clases BEM para todos los bloques y elementos.
 */
const Footer = () => {
    return (
        <footer className="footer">
            {/* Bloque de redes sociales */}
            <div className="footer__redes">
                <a className="footer__redes-enlace" href="#" target="_blank" rel="">Twitter</a>
                <a className="footer__redes-enlace" href="#" target="_blank" rel="">Instagram</a>
                <a className="footer__redes-enlace" href="#" target="_blank" rel="">Facebook</a>
            </div>

            {/* Bloque de enlaces legales */}
            <div className="footer__enlaces">
                <Link className="footer__enlaces-link" to="/privacidad">Política de privacidad</Link>
                <Link className="footer__enlaces-link" to="/cookies">Política de cookies</Link>
                <Link className="footer__enlaces-link" to="/legal">Aviso legal</Link>
            </div>

            {/* Aviso de copyright */}
            <div className="footer__copy">
                <p>&copy; 2025 Oublier Films. Todos los derechos reservados.</p>
            </div>
        </footer>
    );
}

export default Footer;

