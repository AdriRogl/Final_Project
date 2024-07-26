import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./fpassword.css"; // Archivo CSS para estilos

const Fpassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate(); // Utilizar useNavigate en lugar de useHistory

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSend = () => {
    // Aquí agregarías la lógica para enviar el correo de recuperación
    alert(`Se ha enviado la recuperación de contraseña a: ${email}`);
  };

  const handleCancel = () => {
    navigate(-1); // Navegar hacia atrás en el historial
  };

  return (
    <div className="fpassword-container">
      <div className="fpassword-box">
        <h2>Recuperación de Contraseña</h2>
        <input
          type="email"
          placeholder="Ingrese su correo electrónico"
          value={email}
          onChange={handleEmailChange}
        />
        <div className="fpassword-buttons">
          <button onClick={handleSend}>Enviar</button>
          <button onClick={handleCancel}>Cancelar</button>
        </div>
      </div>
    </div>
  );
};

export default Fpassword;
