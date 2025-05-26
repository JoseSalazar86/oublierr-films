import React from 'react';
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import UsuarioBarra from '../components/UsuarioBarra';



function LayoutPublic() {
  return (
    <>
      <Header />
      <UsuarioBarra/>
      <main className="main">
        <Outlet />
      </main>
      <Footer/>
    </>
  );
}

export default LayoutPublic;



