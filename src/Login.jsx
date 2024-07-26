// src/Login.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./login.css";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    navigate("/diary");
  };

  const handleCancel = () => {
    navigate(-1); // Navegar hacia atrás en el historial
  };

  return (
    <div className="login-container">
      <header className="login-header">
        <h1>Bienvenido</h1>
      </header>
      <img
        src="./Images/Peace.jpeg"
        alt="Bienvenidos"
        className="login-image"
      />
      <form className="login-form" onSubmit={handleSubmit}>
        <label>
          Ingrese el correo:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </label>
        <label>
          Ingrese la contraseña:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </label>
        <button type="submit" className="login-button">
          Iniciar sesión
        </button>
        <button type="button" className="login-button" onClick={handleCancel}>
          Cancelar
        </button>
        <div className="login-options">
          <label>
            <input
              type="checkbox"
              name="rememberMe"
              checked={formData.rememberMe}
              onChange={handleChange}
            />
            Recordarme
          </label>
          <Link to="/Fpassword" className="Fpassword">
            ¿Olvidaste tu contraseña?
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
