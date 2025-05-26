# 🎬 Oublier Films

SPA desarrollada en **React** para explorar, buscar y guardar películas favoritas utilizando la API de TMDB. Incluye registro de usuario, dashboard privado, modo oscuro, filtros avanzados y gestión de favoritos.

---

## 🚀 Características principales

- **SPA en React** con rutas públicas y privadas (React Router DOM).
- **Consumo de la API pública TMDB** para películas populares, estrenos, mejor valoradas y próximas.
- **Registro y Login de usuario** (Firebase Auth).
- **Página de Inicio:** sección principal (hero), listado de películas populares y estrenos, explorador rápido por género y llamada a registro.
- **Página de Películas:** buscador en tiempo real y filtros avanzados (género, año, idioma, orden), sincronizados con la URL.
- **Detalle de Película:** ficha completa con sinopsis, reparto principal (en horizontal), tráiler de YouTube (si existe), y botones de añadir a favoritos y volver.
- **Favoritos:** guardado en localStorage, listado elegante con cards, imagen, título y eliminación de favoritos.
- **Dashboard privado** para usuarios registrados.
- **Perfil de usuario editable** (nombre, apellido, fecha de nacimiento, bio), persistente en localStorage.
- **Formulario de contacto** validado con Formik + Yup (nombre, email, fecha, teléfono, motivo, mensaje, checkbox).
- **Modo oscuro/claro** totalmente funcional, con CSS custom properties.
- **Nomenclatura y estructura BEM** en todo el CSS.
- **Responsive** en layouts principales.
- **Accesibilidad básica** y feedback visual amigable.
- **Separación de layouts públicos y privados**.
- **Carga diferida (lazy loading)** y página 404 personalizada.
- **Preparado para despliegue en Netlify, Vercel o GitHub Pages.**

---

## 🗂️ Estructura del proyecto

```
src/
├── components/
│   ├── ButtonLogin.jsx
│   ├── ButtonRegister.jsx
│   ├── CardPelicula.jsx
│   ├── DarkModeToggle.jsx
│   ├── ExplorarGeneros.jsx
│   ├── Footer.jsx
│   ├── Header.jsx
│   └── UsuarioBarra.jsx
├── context/
│   └── AuthContext.jsx
├── hooks/
│   └── useApi.js
├── layouts/
│   ├── LayoutPrivate.jsx
│   └── LayoutPublic.jsx
├── pages/
│   ├── Contacto.jsx
│   ├── Dashboard.jsx
│   ├── Favoritos.jsx
│   ├── Home.jsx
│   ├── Login.jsx
│   ├── NotFound.jsx
│   ├── Pelicula.jsx
│   ├── Peliculas.jsx
│   └── Perfil.jsx
├── css/
│   ├── base.css
│   ├── home.css
│   ├── pelicula.css
│   ├── peliculas.css
│   └── ...otros
├── router/
│   └── AppRouter.jsx
└── main.jsx
```

---

## 🎨 Tecnologías utilizadas

- **React** (con hooks y componentes funcionales)
- **React Router DOM** (v6)
- **Firebase Auth** (para login y registro)
- **API TMDB** (The Movie Database)
- **Formik** y **Yup** (formularios y validación)
- **CSS modular** siguiendo **metodología BEM**
- **CSS Custom Properties** (modo oscuro/claro)
- **LocalStorage** para favoritos y perfil
- **Lazy loading** (`React.lazy`, `Suspense`)
- **Vite** (bundler para desarrollo y build)
- **Despliegue:** preparado para Netlify/Vercel/GitHub Pages

---

## 📋 Funcionalidades implementadas

### **General**
- SPA reactiva y sin recarga.
- Navegación protegida según estado de usuario.
- Gestión de errores en llamadas a la API.

### **Películas**
- Listado con paginación y filtros combinables.
- Cards de películas reutilizables (BEM).
- Detalle de película con reparto y tráiler.

### **Usuario**
- Registro/Login/Logout seguro (Firebase).
- Dashboard y perfil editable persistente.
- Favoritos persistentes, sin duplicados, con opción de eliminar.

### **UX/UI**
- Hero con llamada a la acción, navegación adaptativa y footer con RRSS y enlaces legales.
- Diseño responsive y accesible.
- Dark mode/Light mode instantáneo.

---

## 📝 Instalación y ejecución local

1. Clona este repositorio:

   ```bash
   git clone https://github.com/JoseSalazar86/oublierr-films.git
   cd oublier-films
   ```

2. Instala las dependencias:

   ```bash
   npm install
   ```

3. Crea un archivo `.env` con tus claves de Firebase y TMDB:

   ```
   VITE_FIREBASE_API_KEY=...
   VITE_FIREBASE_AUTH_DOMAIN=...
   VITE_FIREBASE_PROJECT_ID=...
   VITE_FIREBASE_STORAGE_BUCKET=...
   VITE_FIREBASE_MESSAGING_SENDER_ID=...
   VITE_FIREBASE_APP_ID=...

   VITE_TMDB_API_KEY=...
   ```

4. Ejecuta en modo desarrollo:

   ```bash
   npm run dev
   ```

---

## 📦 Despliegue

- **Netlify / Vercel / GitHub Pages** (SPA ready)
- Añade las variables de entorno en el panel de despliegue
- Build de producción: `npm run build`

---



## 👨‍💻 Autor

**Jose Alfonso Salazar Ramos**  
[Repositorio en GitHub](https://github.com/JoseSalazar86/oublierr-films)

---
