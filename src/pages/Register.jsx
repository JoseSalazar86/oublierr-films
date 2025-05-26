import React from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "../css/register.css";

/**
 * Componente de registro de usuario.
 * Usa BEM en las clases y Formik + Yup para la validación del formulario.
 */
function Register() {
  const navigate = useNavigate();

  // Validación del formulario con Yup
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Correo inválido.")
      .required("El correo es obligatorio."),
    password: Yup.string()
      .min(6, "La contraseña debe tener al menos 6 caracteres.")
      .required("La contraseña es obligatoria."),
    confirmar: Yup.string()
      .oneOf([Yup.ref("password")], "Las contraseñas no coinciden.")
      .required("Debes confirmar la contraseña.")
  });

  // Lógica de envío del formulario
  const handleSubmit = async (values, { setSubmitting, setFieldError }) => {
    try {
      await createUserWithEmailAndPassword(auth, values.email, values.password);
      navigate("/dashboard");
    } catch (error) {
      // Diferentes errores de Firebase Auth
      if (error.code === "auth/email-already-in-use") {
        setFieldError("email", "Este correo ya está registrado.");
      } else if (error.code === "auth/invalid-email") {
        setFieldError("email", "Correo inválido.");
      } else if (error.code === "auth/network-request-failed") {
        setFieldError("email", "Error de red. Intenta de nuevo.");
      } else {
        setFieldError("email", "Ocurrió un error inesperado. Intenta más tarde.");
        console.error(error);
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="register">
      <h2 className="register__titulo">Registro de Usuario</h2>
      <Formik
        initialValues={{
          email: "",
          password: "",
          confirmar: ""
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        validateOnChange={true}
        validateOnBlur={true}
      >
        {({ isSubmitting }) => (
          <Form className="register__formulario">
            {/* Campo Email */}
            <div className="register__campo">
              <label htmlFor="email" className="register__label">Email:</label>
              <Field type="email" name="email" className="register__input" />
              <ErrorMessage name="email" component="span" className="register__error" />
            </div>

            {/* Campo Contraseña */}
            <div className="register__campo">
              <label htmlFor="password" className="register__label">Contraseña:</label>
              <Field type="password" name="password" className="register__input" />
              <ErrorMessage name="password" component="span" className="register__error" />
            </div>

            {/* Campo Confirmar Contraseña */}
            <div className="register__campo">
              <label htmlFor="confirmar" className="register__label">Confirmar contraseña:</label>
              <Field type="password" name="confirmar" className="register__input" />
              <ErrorMessage name="confirmar" component="span" className="register__error" />
            </div>

            {/* Botón de registro */}
            <button type="submit" className="register__btn" disabled={isSubmitting}>
              {isSubmitting ? "Registrando..." : "Registrarse"}
            </button>
          </Form>
        )}
      </Formik>
    </section>
  );
}

export default Register;

