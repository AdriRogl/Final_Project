import React, { useState } from "react";
import "./register.css";

const Register = () => {
  const [formData, setFormData] = useState({
    nickname: "",
    birthdate: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes manejar el envío del formulario
    console.log(formData);
  };

  const handleCancel = () => {
    setFormData({
      nickname: "",
      birthdate: "",
      email: "",
      password: "",
    });
  };

  return (
    <div className="register-container">
      <header className="register-header">
        <h1>Registro</h1>
      </header>
      <div className="register-content">
        <p>
          Con PeacePals, no solo encuentras entretenimiento, sino también una
          herramienta poderosa para mejorar tu bienestar emocional y mental.
        </p>
        <img src="./Images/hug.jpg" className="register-image" />
      </div>
      <div className="register-form-container">
        <button className="register-button">Iniciar Sesión</button>
        <button className="register-button"> Registro </button>
        <form className="register-form" onSubmit={handleSubmit}>
          <label>
            Nombre o Nickname:
            <input
              type="text"
              name="nickname"
              value={formData.nickname}
              onChange={handleChange}
            />
          </label>
          <label>
            Fecha de Nacimiento:
            <input
              type="date"
              name="birthdate"
              value={formData.birthdate}
              onChange={handleChange}
            />
          </label>
          <label>
            Correo:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </label>
          <label>
            Contraseña:
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </label>
          <div className="register-form-buttons">
            <button type="submit" className="register-form-button">
              Guardar
            </button>
            <button
              type="button"
              className="register-form-button"
              onClick={handleCancel}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
