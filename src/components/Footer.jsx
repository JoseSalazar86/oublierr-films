import React from "react";
import { Link } from "react-router-dom";
import "../css/index.css";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-redes">
                <a href="https://twitter.com/oublierrfilms" target="_blank" rel="noopener noreferrer">Twitter</a>
                <a href="https://instagram.com/oublierrfilms" target="_blank" rel="noopener noreferrer">Instagram</a>
                <a href="https://facebook.com/oublierrfilms" target="_blank" rel="noopener noreferrer">Facebook</a>
            </div>

            <div className="footer-enlaces">
                <Link to="/privacidad">Política de privacidad</Link>
                <Link to="/cookies">Política de cookies</Link>
                <Link to="/legal">Aviso legal</Link>
            </div>

            <div className="footer-copy">
            <p>&copy; 2025 Oublier Films. Todos los derechos reservados.</p>
        </div>
        </footer>
    )
}

export default Footer;
