import React from 'react';
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ButtonLogin from '../components/ButtonLogin';

function LayoutPublic() {
  return (
    <>
      <Header />
      <ButtonLogin />
     
      <main className="main">
        <Outlet />
      </main>
      <Footer/>
    </>
  );
}

export default LayoutPublic;



