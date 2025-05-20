import React from 'react';
import { Outlet, Navigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ButtonLogin from '../components/ButtonLogin';

function LayoutPrivate() {
  const { user } = useAuth();

  // Si no hay usuario, redirige a /
  if (!user) return <Navigate to="/" />;

  return (
    <>
      <Header />
      <div className="user">
        <h3>{user?.nombre || user?.email || "usuario"}!</h3>
        <Link to="/perfil" className="enlace-perfil">
          Ir a tu perfil
        </Link>
      </div>
      <ButtonLogin/>
      <main className="main">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default LayoutPrivate;



