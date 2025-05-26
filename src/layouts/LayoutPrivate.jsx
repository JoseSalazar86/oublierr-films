import React from 'react';
import { Outlet, Navigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Header from "../components/Header";
import Footer from "../components/Footer";
import UsuarioBarra from '../components/UsuarioBarra';


function LayoutPrivate() {
  const { user } = useAuth();

  if (!user) return <Navigate to="/" />;

  return (
    <>
      <Header />
      <UsuarioBarra/>
      <main className="main">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default LayoutPrivate;





