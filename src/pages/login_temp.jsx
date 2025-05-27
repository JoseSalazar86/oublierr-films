import React from 'react';
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "../css/login.css";
import "../css/index.css"

/**
 * Página de login (Iniciar sesión)
 * Usa BEM para las clases y Formik + Yup para la gestión y validación del formulario.
 */
 function Login() {
  const navigate = useNavigate();

  // Esquema de validación de formulario con Yup
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Correo inválido")
      .required("El correo es obligatorio"),
    password: Yup.string()
      .min(6, "Debe tener al menos 6 caracteres")
      .required("La contraseña es obligatoria"),
  });

  /**
   * handleSubmit - función que se ejecuta al enviar el formulario.
   * Llama a Firebase Auth para iniciar sesión.
   * Si el login es correcto, navega al dashboard.
   * Si hay error, muestra mensajes personalizados.
   */
  const handleSubmit = async (values, { setSubmitting, setFieldError }) => {
    try {
      await signInWithEmailAndPassword(auth, values.email, values.password);
      navigate("/dashboard");
    } catch (error) {
      // Si el usuario no existe o la contraseña es incorrecta, muestra error en ambos campos
      if (error.code === "auth/user-not-found" || error.code === "auth/wrong-password") {
        setFieldError("email", "Correo o contraseña incorrectos");
        setFieldError("password", "Correo o contraseña incorrectos");
      } else {
        alert("Error de autenticación.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="login">
      {/* Título de la página */}
      <h2 className="login__titulo">Iniciar sesión</h2>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        validateOnChange={true}
        validateOnBlur={true}
      >
        {({ isSubmitting }) => (
          // Formulario principal con clases BEM
          <Form className="login__formulario">
            {/* Campo Email */}
            <div className="login__campo">
              <label htmlFor="email" className="login__label">Email:</label>
              <Field name="email" type="email" className="login__input" />
              {/* Mensaje de error para email */}
              <ErrorMessage name="email" component="span" className="login__error" />
            </div>
            {/* Campo Contraseña */}
            <div className="login__campo">
              <label htmlFor="password" className="login__label">Contraseña:</label>
              <Field name="password" type="password" className="login__input" />
              {/* Mensaje de error para contraseña */}
              <ErrorMessage name="password" component="span" className="login__error" />
            </div>
            {/* Enlace a registro */}
            <p className="login__register-link">
              ¿No tienes cuenta? <a href="/register" className="login__enlace">Regístrate aquí</a>
            </p>
            {/* Botón para enviar el formulario */}
            <button type="submit" className="login__btn" disabled={isSubmitting}>
              {isSubmitting ? "Entrando..." : "Entrar"}
            </button>
          </Form>
        )}
      </Formik>
    </section>
  );
}

export default Login;