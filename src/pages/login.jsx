import React from 'react';
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "../css/index.css";

export default function Login() {
  const navigate = useNavigate();

  // Esquema de validación con Yup
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Correo inválido")
      .required("El correo es obligatorio"),
    password: Yup.string()
      .min(6, "Debe tener al menos 6 caracteres")
      .required("La contraseña es obligatoria"),
  });

  // Función de submit
  const handleSubmit = async (values, { setSubmitting, setFieldError }) => {
    try {
      await signInWithEmailAndPassword(auth, values.email, values.password);
      navigate("/dashboard");
    } catch (error) {
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
      <h2>Iniciar sesión</h2>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        validateOnChange={true}
        validateOnBlur={true}
      >
        {({ isSubmitting }) => (
          <Form className="formulario">
            <div className="campo">
              <label htmlFor="email">Email:</label>
              <Field name="email" type="email" />
              <ErrorMessage name="email" component="span" className="error" />
            </div>
            <div className="campo">
              <label htmlFor="password">Contraseña:</label>
              <Field name="password" type="password" />
              <ErrorMessage name="password" component="span" className="error" />
            </div>
            <p className="register-link">
              ¿No tienes cuenta? <a href="/register">Regístrate aquí</a>
            </p>
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Entrando..." : "Entrar"}
            </button>
          </Form>
        )}
      </Formik>
    </section>
  );
}
