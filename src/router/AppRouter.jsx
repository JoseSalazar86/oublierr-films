import { createBrowserRouter } from "react-router-dom";
import { Suspense } from "react";
import React from 'react';

// Layouts
const LayoutPublic = React.lazy(() => import("../layouts/LayoutPublic"));
const LayoutPrivate = React.lazy(() => import("../layouts/LayoutPrivate"));

// Páginas públicas
const Home = React.lazy(() => import("../pages/Home"));
const Login = React.lazy(() => import("../pages/Login"));
const Register = React.lazy(() => import("../pages/Register"));
const Contacto = React.lazy(() => import("../pages/Contacto"));
const NotFound = React.lazy(() => import("../pages/NotFound"));
const Peliculas = React.lazy(() => import("../pages/Peliculas"));   // Listado y buscador
const Pelicula = React.lazy(() => import("../pages/Pelicula"));     // Detalle descriptivo

// Páginas privadas
const Dashboard = React.lazy(() => import("../pages/Dashboard"));
const Perfil = React.lazy(() => import("../pages/Perfil"));
const Favoritos = React.lazy(() => import("../pages/Favoritos"));

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<div>Cargando...</div>}>
        <LayoutPublic />
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<div>Cargando...</div>}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: "login",
        element: (
          <Suspense fallback={<div>Cargando...</div>}>
            <Login />
          </Suspense>
        ),
      },
      {
        path: "register",
        element: (
          <Suspense fallback={<div>Cargando...</div>}>
            <Register />
          </Suspense>
        ),
      },
      {
        path: "contacto",
        element: (
          <Suspense fallback={<div>Cargando...</div>}>
            <Contacto />
          </Suspense>
        ),
      },
      {
        path: "peliculas",
        element: (
          <Suspense fallback={<div>Cargando...</div>}>
            <Peliculas />
          </Suspense>
        ),
      },
      {
        path: "pelicula/:id",
        element: (
          <Suspense fallback={<div>Cargando...</div>}>
            <Pelicula />
          </Suspense>
        ),
      },
    ],
    errorElement: (
      <Suspense fallback={<div>Cargando...</div>}>
        <NotFound />
      </Suspense>
    ),
  },
  {
    path: "/dashboard",
    element: (
      <Suspense fallback={<div>Cargando...</div>}>
        <LayoutPrivate />
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<div>Cargando...</div>}>
            <Dashboard />
          </Suspense>
        ),
      },
      {
        path: "perfil",
        element: (
          <Suspense fallback={<div>Cargando...</div>}>
            <Perfil />
          </Suspense>
        ),
      },
      {
        path: "favoritos",
        element: (
          <Suspense fallback={<div>Cargando...</div>}>
            <Favoritos />
          </Suspense>
        ),
      },
    ],
  },
]);
