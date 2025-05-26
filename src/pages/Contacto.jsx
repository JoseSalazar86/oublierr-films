import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "../css/contacto.css"

// Esquema de validación Yup (añadido mensaje)
const validationSchema = Yup.object({
  nombre: Yup.string()
    .min(3, "El nombre debe tener al menos 3 letras.")
    .required("El nombre es obligatorio."),
  email: Yup.string()
    .email("Correo electrónico inválido.")
    .required("El correo es obligatorio."),
  fecha: Yup.string()
    .required("Debes seleccionar una fecha."),
  telefono: Yup.string()
    .matches(/^\d{9}$/, "Introduce un número válido de 9 cifras.")
    .required("El teléfono es obligatorio."),
  motivo: Yup.string()
    .required("Selecciona un motivo."),
  mensaje: Yup.string()
    .min(10, "El mensaje debe tener al menos 10 caracteres.")
    .required("El mensaje es obligatorio."),
  acepto: Yup.boolean()
    .oneOf([true], "Debes aceptar los términos.")
});

function Contacto() {
  const handleSubmit = (values, { resetForm }) => {
    alert("Formulario enviado correctamente.");
    // Aquí puedes enviar los datos a una API si lo deseas
    resetForm();
  };

  return (
    <section className="contacto">
      <h2 className="contacto__titulo">Contacto</h2>
      <Formik
        initialValues={{
          nombre: "",
          email: "",
          fecha: "",
          telefono: "",
          motivo: "",
          mensaje: "",
          acepto: false,
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        validateOnBlur
        validateOnChange
      >
        {({ isSubmitting }) => (
          <Form className="contacto__form">
            {/* Nombre */}
            <div className="contacto__campo">
              <label className="contacto__label" htmlFor="nombre">Nombre:</label>
              <Field
                className="contacto__input"
                type="text"
                name="nombre"
                id="nombre"
              />
              <ErrorMessage name="nombre" component="span" className="contacto__error" />
            </div>

            {/* Email */}
            <div className="contacto__campo">
              <label className="contacto__label" htmlFor="email">Email:</label>
              <Field
                className="contacto__input"
                type="email"
                name="email"
                id="email"
              />
              <ErrorMessage name="email" component="span" className="contacto__error" />
            </div>

            {/* Fecha */}
            <div className="contacto__campo">
              <label className="contacto__label" htmlFor="fecha">Fecha de contacto:</label>
              <Field
                className="contacto__input"
                type="date"
                name="fecha"
                id="fecha"
              />
              <ErrorMessage name="fecha" component="span" className="contacto__error" />
            </div>

            {/* Teléfono */}
            <div className="contacto__campo">
              <label className="contacto__label" htmlFor="telefono">Teléfono:</label>
              <Field
                className="contacto__input"
                type="tel"
                name="telefono"
                id="telefono"
              />
              <ErrorMessage name="telefono" component="span" className="contacto__error" />
            </div>

            {/* Motivo */}
            <div className="contacto__campo">
              <label className="contacto__label" htmlFor="motivo">Motivo de contacto:</label>
              <Field
                as="select"
                className="contacto__select"
                name="motivo"
                id="motivo"
              >
                <option value="">-- Selecciona --</option>
                <option value="problema">Tengo un problema</option>
                <option value="sugerencia">Quiero sugerir algo</option>
                <option value="otro">Otro</option>
              </Field>
              <ErrorMessage name="motivo" component="span" className="contacto__error" />
            </div>

            {/* Mensaje (textarea) */}
            <div className="contacto__campo">
              <label className="contacto__label" htmlFor="mensaje">Mensaje:</label>
              <Field
                as="textarea"
                className="contacto__textarea"
                name="mensaje"
                id="mensaje"
                rows={4}
                placeholder="Escribe tu mensaje aquí..."
              />
              <ErrorMessage name="mensaje" component="span" className="contacto__error" />
            </div>

            {/* Aceptar términos */}
            <div className="contacto__campo contacto__campo--checkbox">
              <label className="contacto__label">
                <Field
                  type="checkbox"
                  name="acepto"
                  className="contacto__checkbox"
                />
                Acepto los términos y condiciones
              </label>
              <ErrorMessage name="acepto" component="span" className="contacto__error" />
            </div>

            {/* Botón */}
            <button
              className="contacto__btn"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Enviando..." : "Enviar"}
            </button>
          </Form>
        )}
      </Formik>
    </section>
  );
}

export default Contacto;

