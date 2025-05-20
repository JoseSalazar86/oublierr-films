import React from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "../css/index.css";

function Register() {
  const navigate = useNavigate();

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

  const handleSubmit = async (values, { setSubmitting, setFieldError }) => {
    try {
      await createUserWithEmailAndPassword(auth, values.email, values.password);
      navigate("/dashboard");
    } catch (error) {
      // Diferencia los códigos de error de Firebase Auth
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
      <h2>Registro de Usuario</h2>
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
          <Form className="formulario">
            <div className="campo">
              <label htmlFor="email">Email:</label>
              <Field type="email" name="email" />
              <ErrorMessage name="email" component="span" className="error" />
            </div>

            <div className="campo">
              <label htmlFor="password">Contraseña:</label>
              <Field type="password" name="password" />
              <ErrorMessage name="password" component="span" className="error" />
            </div>

            <div className="campo">
              <label htmlFor="confirmar">Confirmar contraseña:</label>
              <Field type="password" name="confirmar" />
              <ErrorMessage name="confirmar" component="span" className="error" />
            </div>

            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Registrando..." : "Registrarse"}
            </button>
          </Form>
        )}
      </Formik>
    </section>
  );
}

export default Register;
